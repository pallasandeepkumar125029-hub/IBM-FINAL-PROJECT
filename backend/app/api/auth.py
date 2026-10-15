from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, decode_token
from app.models.models import User, Profile, Streak
from app.schemas.schemas import UserRegister, UserLogin, TokenResponse
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    payload = decode_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(User).filter(User.id == int(payload["sub"])).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/register", response_model=TokenResponse)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")
        
    user = User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
        full_name=user_in.full_name,
        role="student"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Create empty profile & streak
    profile = Profile(
        user_id=user.id,
        education_level=user_in.education_level or "B.Tech CSE",
        college=user_in.college or "Engineering Institute",
        career_goal=user_in.career_goal or "AI/ML Engineer",
        onboarded=False
    )
    db.add(profile)
    
    streak = Streak(user_id=user.id, current_streak=1, xp_points=100, level=1)
    db.add(streak)
    db.commit()

    token = create_access_token({"sub": str(user.id), "email": user.email, "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "onboarded": False
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    token = create_access_token({"sub": str(user.id), "email": user.email, "role": user.role})
    
    is_onboarded = user.profile.onboarded if user.profile else False
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "onboarded": is_onboarded
        }
    }

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    profile = current_user.profile
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "profile": {
            "education_level": profile.education_level if profile else "",
            "college": profile.college if profile else "",
            "degree": profile.degree if profile else "",
            "year_of_study": profile.year_of_study if profile else "",
            "career_goal": profile.career_goal if profile else "",
            "current_skill_level": profile.current_skill_level if profile else "",
            "daily_hours": profile.daily_hours if profile else "",
            "onboarded": profile.onboarded if profile else False
        }
    }
