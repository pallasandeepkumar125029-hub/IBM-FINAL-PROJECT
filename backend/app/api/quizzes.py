import json
import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.models import User, Quiz, Question, QuizAttempt, Streak
from app.schemas.schemas import QuizSubmit, QuizResultSchema

router = APIRouter(prefix="/quizzes", tags=["Adaptive Quizzes"])

@router.get("/")
def get_quizzes(db: Session = Depends(get_db)):
    quizzes = db.query(Quiz).all()
    res = []
    for q in quizzes:
        res.append({
            "id": q.id,
            "title": q.title,
            "topic": q.topic,
            "difficulty": q.difficulty,
            "total_questions": len(q.questions)
        })
    return res

@router.get("/{quiz_id}")
def get_quiz_by_id(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    questions_res = []
    for q in quiz.questions:
        options = json.loads(q.options_json) if q.options_json else []
        questions_res.append({
            "id": q.id,
            "question_text": q.question_text,
            "question_type": q.question_type,
            "options": options
        })

    return {
        "id": quiz.id,
        "title": quiz.title,
        "topic": quiz.topic,
        "difficulty": quiz.difficulty,
        "total_questions": len(quiz.questions),
        "questions": questions_res
    }

@router.post("/submit", response_model=QuizResultSchema)
def submit_quiz(data: QuizSubmit, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == data.quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    questions = db.query(Question).filter(Question.quiz_id == quiz.id).all()
    if not questions:
        raise HTTPException(status_code=400, detail="Quiz has no questions")

    correct_count = 0
    weak_topics = []

    for q in questions:
        user_ans = data.user_answers.get(q.id) or data.user_answers.get(str(q.id))
        if user_ans and str(user_ans).strip().lower() == str(q.correct_answer).strip().lower():
            correct_count += 1
        else:
            weak_topics.append(q.question_text[:40] + "...")

    total_q = len(questions)
    accuracy = round((correct_count / total_q) * 100, 1)
    passed = accuracy >= 70.0
    
    # Adaptive difficulty scaling logic
    if accuracy >= 85.0:
        new_diff = "Advanced"
    elif accuracy >= 60.0:
        new_diff = "Medium"
    else:
        new_diff = "Foundational Revision"

    # Save quiz attempt
    attempt = QuizAttempt(
        user_id=current_user.id,
        quiz_id=quiz.id,
        score=correct_count,
        total_score=total_q,
        accuracy_percentage=accuracy,
        time_taken_seconds=data.time_taken_seconds,
        difficulty_level=new_diff,
        weak_topics_json=json.dumps(weak_topics)
    )
    db.add(attempt)

    # Award XP & update streak
    xp_earned = int(accuracy * 1.5)
    streak = db.query(Streak).filter(Streak.user_id == current_user.id).first()
    current_streak_val = 1
    if streak:
        streak.xp_points += xp_earned
        current_streak_val = streak.current_streak

    db.commit()
    db.refresh(attempt)

    feedback = f"### 📊 Quiz Evaluation Summary\n"
    if passed:
        feedback += f"🎉 **Outstanding performance!** You scored **{correct_count}/{total_q} ({accuracy}%)**.\n"
        feedback += f"Your next adaptive quiz difficulty has been upgraded to **{new_diff}**!\n"
    else:
        feedback += f"📚 **Revision Recommended!** You scored **{correct_count}/{total_q} ({accuracy}%)**.\n"
        feedback += f"Your Tutor Agent has generated simplified review topics for your weak areas.\n"

    return {
        "attempt_id": attempt.id,
        "score": correct_count,
        "total_score": total_q,
        "accuracy_percentage": accuracy,
        "difficulty_level": new_diff,
        "passed": passed,
        "weak_topics": weak_topics,
        "feedback_markdown": feedback,
        "xp_gained": xp_earned,
        "new_streak": current_streak_val
    }
