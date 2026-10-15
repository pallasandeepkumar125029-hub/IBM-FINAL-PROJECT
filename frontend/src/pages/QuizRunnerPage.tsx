import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Quiz, Question } from '../types';
import {
  Award,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

export const QuizRunnerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    if (id) loadQuiz(parseInt(id, 10));
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadQuiz = async (quizId: number) => {
    try {
      const res = await api.getQuizById(quizId);
      setQuiz(res);
    } catch (err) {
      console.error('Failed to load quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setSubmitting(true);
    try {
      const res = await api.submitQuiz({
        quiz_id: quiz.id,
        user_answers: answers,
        time_taken_seconds: seconds
      });
      setResult(res);
    } catch (err) {
      console.error('Quiz submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !quiz) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading quiz questions...</span>
        </div>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQ = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Quiz Header Bar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-200 bg-white shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-slate-900">{quiz.title}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-semibold">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-600" /> {Math.floor(seconds / 60)}m {seconds % 60}s
          </span>
          <span>Question {currentIdx + 1} of {questions.length}</span>
        </div>
      </div>

      {/* QUIZ RESULT MODAL / OVERLAY */}
      {result ? (
        <div className="glass-card rounded-3xl p-8 border border-purple-200 bg-white shadow-md text-center space-y-6 animate-fadeIn">
          <div className="inline-flex p-4 rounded-3xl bg-amber-50 text-amber-700 border border-amber-200">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">Quiz Completed!</h2>
            <p className="text-sm text-slate-600">
              Score: <span className="text-purple-700 font-bold">{result.score} / {result.total_score} ({result.accuracy_percentage}%)</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap text-left leading-relaxed">
            {result.feedback_markdown}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/quizzes')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => navigate('/tutor')}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-sm transition-all"
            >
              Ask AI Tutor About Weak Topics
            </button>
          </div>
        </div>
      ) : (
        /* QUESTION RUNNER */
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
              Type: {currentQ?.question_type?.toUpperCase() || 'MCQ'}
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">{currentQ?.question_text}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ?.options?.map((opt, oIdx) => {
              const selected = answers[currentQ.id] === opt;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, opt)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt}</span>
                  {selected && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs rounded-xl disabled:opacity-40 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>

            {isLast ? (
              <button
                id="submit-quiz-btn"
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Quiz'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
