import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Target,
  Clock,
  CheckCircle2,
  Brain,
  Zap,
  Code
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { refreshUserData } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [educationLevel, setEducationLevel] = useState('B.Tech CSE');
  const [college, setCollege] = useState('National Institute of Technology');
  const [degree, setDegree] = useState('Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');

  const [careerGoal, setCareerGoal] = useState('AI/ML Engineer');

  const [pythonLevel, setPythonLevel] = useState('Beginner');
  const [mathLevel, setMathLevel] = useState('Beginner');
  const [mlLevel, setMlLevel] = useState('Beginner');
  const [dsaLevel, setDsaLevel] = useState('Beginner');

  const [dailyHours, setDailyHours] = useState('2 hours');
  const [learningPreference, setLearningPreference] = useState('Interactive AI Tutoring + Project-Based Coding');

  const [generationLog, setGenerationLog] = useState<string[]>([]);

  const careerOptions = [
    'AI/ML Engineer',
    'Data Scientist',
    'Generative AI Engineer',
    'Full Stack AI Developer',
    'Data Analyst',
    'AI Researcher'
  ];

  const timeOptions = ['30 minutes', '1 hour', '2 hours', '3+ hours'];

  const handleFinishOnboarding = async () => {
    setLoading(true);
    setGenerationLog(['Analyzing student profile & baseline skills...']);

    setTimeout(() => setGenerationLog((prev) => [...prev, 'Mapping prerequisite dependencies (Python -> Linear Algebra -> PyTorch)...']), 600);
    setTimeout(() => setGenerationLog((prev) => [...prev, 'Synthesizing 8-Phase adaptive AI learning path...']), 1200);

    setTimeout(async () => {
      try {
        await api.submitOnboarding({
          education_level: educationLevel,
          college,
          degree,
          year_of_study: yearOfStudy,
          career_goal: careerGoal,
          current_skill_level: 'Beginner',
          daily_hours: dailyHours,
          learning_preferences: learningPreference,
          skills: [
            { skill_name: 'Python', proficiency: pythonLevel },
            { skill_name: 'Mathematics', proficiency: mathLevel },
            { skill_name: 'Machine Learning', proficiency: mlLevel },
            { skill_name: 'DSA', proficiency: dsaLevel }
          ]
        });
        await refreshUserData();
        navigate('/dashboard');
      } catch (err) {
        console.error('Failed onboarding:', err);
        navigate('/dashboard');
      }
    }, 1800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 bg-white shadow-xl relative overflow-hidden">
        
        {/* Progress Stepper Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
            <span>Step {step} of 6</span>
            <span className="text-purple-700 font-bold">{Math.round((step / 6) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 h-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: EDUCATION */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Academic Education Background</h2>
              <p className="text-xs text-slate-500">Tell us about your college and current academic program.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Degree Program</label>
                <input
                  id="onboarding-degree-input"
                  type="text"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                  placeholder="e.g. B.Tech Computer Science"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">College / Institute Name</label>
                <input
                  id="onboarding-college-input"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                  placeholder="e.g. National Institute of Technology"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Year of Study</label>
                <select
                  id="onboarding-year-select"
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                >
                  <option value="1st Year">1st Year Student</option>
                  <option value="2nd Year">2nd Year Student</option>
                  <option value="3rd Year">3rd Year Student</option>
                  <option value="4th Year">4th Year Student</option>
                  <option value="Graduated">Graduated / Working Professional</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                id="onboarding-step1-next"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all"
              >
                <span>Next: Target Career Goal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CAREER GOAL */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Select Your Target AI Career Goal</h2>
              <p className="text-xs text-slate-500">SkillPilot AI will align your learning path and project recommendations with this target role.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {careerOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCareerGoal(opt)}
                  className={`p-4 rounded-2xl border text-left font-bold transition-all ${
                    careerGoal === opt
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="onboarding-step2-next"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all"
              >
                <span>Next: Skill Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SKILL ASSESSMENT */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600">
                <Brain className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Current Skill Assessment</h2>
              <p className="text-xs text-slate-500">Rate your current proficiency in core AI prerequisite subjects.</p>
            </div>

            <div className="space-y-4 text-xs">
              {[
                { name: 'Python Programming', state: pythonLevel, setter: setPythonLevel },
                { name: 'Mathematics & Linear Algebra', state: mathLevel, setter: setMathLevel },
                { name: 'Machine Learning', state: mlLevel, setter: setMlLevel },
                { name: 'Data Structures & Algorithms', state: dsaLevel, setter: setDsaLevel },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <select
                    value={item.state}
                    onChange={(e) => item.setter(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-purple-700 font-semibold focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="onboarding-step3-next"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all"
              >
                <span>Next: Time Commitment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DAILY TIME */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Daily Available Study Time</h2>
              <p className="text-xs text-slate-500">How much time can you commit to AI learning every day?</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              {timeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDailyHours(opt)}
                  className={`p-5 rounded-2xl border text-center font-bold text-sm transition-all ${
                    dailyHours === opt
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="onboarding-step4-next"
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all"
              >
                <span>Next: Learning Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: PREFERENCES */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Learning Style & Preferences</h2>
              <p className="text-xs text-slate-500">Choose how you prefer your AI Tutor agent to explain concepts.</p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                'Interactive AI Tutoring + Project-Based Coding',
                'Step-by-Step Mathematical & Theoretical Rigor',
                'Fast-Paced Quiz & Coding Challenges',
                'Visual Diagrams & Hands-On Case Studies'
              ].map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setLearningPreference(pref)}
                  className={`w-full p-4 rounded-2xl border text-left font-bold transition-all ${
                    learningPreference === pref
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="onboarding-step5-next"
                onClick={() => {
                  setStep(6);
                  handleFinishOnboarding();
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all"
              >
                <span>Generate My AI Roadmap</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: AI ROADMAP GENERATION ANIMATION */}
        {step === 6 && (
          <div className="space-y-8 text-center py-8">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
              <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Synthesizing Your AI Roadmap...</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                SkillPilot AI Engine is building a personalized 8-phase curriculum for <span className="text-purple-700 font-bold">{careerGoal}</span>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-left font-mono text-xs text-purple-900 space-y-2">
              {generationLog.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
