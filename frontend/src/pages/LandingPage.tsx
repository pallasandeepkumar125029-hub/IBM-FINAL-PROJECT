import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  Globe,
  BookOpen,
  BrainCircuit,
  Award,
  Briefcase,
  Newspaper,
  Code,
  CheckCircle2,
  Play,
  User,
  Flame
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { loginDemoUser } = useAuth();
  const navigate = useNavigate();
  const [demoQuery, setDemoQuery] = useState('');
  const [demoResponse, setDemoResponse] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoQuery.trim()) return;
    setIsAsking(true);
    setTimeout(() => {
      setDemoResponse(
        `# 🧠 Tutor Agent Response\n\nGreat question! In neural networks, **Backpropagation** uses the calculus chain rule to compute gradients of the loss function with respect to weights:\n\n$$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial \\hat{y}} \\cdot \\frac{\\partial \\hat{y}}{\\partial w}$$\n\n*Click "Start Learning" below to try the full multi-agent environment!*`
      );
      setIsAsking(false);
    }, 800);
  };

  const handleQuickDemoAccess = async () => {
    await loginDemoUser();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Background Glow Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-400/20 via-indigo-300/20 to-pink-300/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* SDG 4 Pill Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-800 shadow-sm mb-8">
          <Globe className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Aligned with UN SDG 4 — Quality Education for All</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
          <span className="text-slate-600">100% Student-Centric</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Your Personal <span className="text-gradient">AI Learning</span> Companion
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Learn smarter with an AI mentor that adapts to your goals, teaches you every day, tracks your progress, and prepares you for your future career.
        </p>

        {/* Value Proposition Badge */}
        <p className="mt-3 text-xs font-medium text-slate-500 uppercase tracking-widest">
          Duolingo + ChatGPT + Coursera + Personal Career Coach for AI Education
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            id="hero-start-learning-btn"
            to="/register"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-2xl shadow-xl shadow-purple-600/25 flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Start Learning Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <button
            id="hero-demo-login-btn"
            onClick={handleQuickDemoAccess}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span>Try Student Demo (1-Click)</span>
          </button>
        </div>

        {/* Key Highlights Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900">8-Phase</div>
            <div className="text-xs text-slate-500 font-medium">Personalized Roadmap</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700">5 Agents</div>
            <div className="text-xs text-slate-500 font-medium">Multi-Agent AI System</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-700">Adaptive</div>
            <div className="text-xs text-slate-500 font-medium">Difficulty Scaling</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">SDG 4</div>
            <div className="text-xs text-slate-500 font-medium">Quality Education</div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE DEMO PREVIEW */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl relative overflow-hidden bg-white">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-600 ml-2">Live AI Tutor Preview</span>
            </div>
            <span className="text-xs font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Orchestrator Active
            </span>
          </div>

          <form onSubmit={handleDemoSubmit} className="flex gap-2">
            <input
              id="landing-demo-input"
              type="text"
              placeholder="Ask your AI Tutor (e.g. 'Explain Backpropagation simply')..."
              value={demoQuery}
              onChange={(e) => setDemoQuery(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
            />
            <button
              id="landing-demo-ask-btn"
              type="submit"
              disabled={isAsking}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              {isAsking ? 'Thinking...' : 'Ask Tutor'}
            </button>
          </form>

          {demoResponse && (
            <div className="mt-4 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs font-mono text-purple-900 whitespace-pre-wrap leading-relaxed animate-fadeIn">
              {demoResponse}
            </div>
          )}
        </div>
      </section>

      {/* 3. VISUAL FEATURE CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-purple-700">Core Value Proposition</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">An Intelligent Mentor That Adapts Daily</p>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            SkillPilot AI replaces generic chatbots with a multi-agent educational pipeline engineered for engineering students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Personalized Learning Roadmap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dynamically generated 8-phase curriculum customized to your college background, current skill level, and available study hours.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Python to GenAI & Interview Prep</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dynamic speed & quiz performance adaptation</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Multi-Agent AI System</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              5 specialized AI agents (Tutor, Research, Career, Quiz Master, Reminder) coordinated by an intelligent Agent Orchestrator.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Explain → Example → Ask → Practice loop</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Grounded with RAG document citations</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Adaptive Quiz Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time quizzes scaling in difficulty based on your score. Identifies weak areas and automatically generates review material.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600" /> MCQ, True/False & Code Debugging</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600" /> Auto difficulty scaling (&gt;85% vs &lt;60%)</li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-700 border border-pink-200 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">AI Career Readiness Coach</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skill Gap Matrix comparing your current proficiency against target job requirements for AI/ML Engineer and Data Scientist roles.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-600" /> Mock AI Technical Interview Simulator</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-600" /> Recommended industry certifications</li>
            </ul>
          </div>

          {/* Card 5 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
              <Newspaper className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Daily AI Research Updates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated summaries of the latest AI papers, model releases (PyTorch, Gemini, DeepSeek), and technical tools with instant 1-min quizzes.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600" /> Source-attributed research feed</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600" /> "Why it matters for students" breakdown</li>
            </ul>
          </div>

          {/* Card 6 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Capstone Project Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Practical project recommendations categorized by difficulty (Beginner AI Chatbot to Advanced Multi-Agent Assistant) with step-by-step guidance.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tech stack & step-by-step steps</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> GitHub repo verification & grade feedback</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 4. USER PERSONA SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-200 bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/40 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
                <User className="w-4 h-4 text-purple-600" /> Target Student Persona
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900">Designed for College Students like Rahul / Alex</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rahul is a 3rd Year B.Tech CSE student with 2 hours of daily study time. He wants to transition from beginner programming to a high-demand AI/ML Engineer role.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-slate-500">Education</div>
                  <div className="font-bold text-slate-900 mt-1">B.Tech Computer Science</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-slate-500">Available Time</div>
                  <div className="font-bold text-amber-700 mt-1">2 Hours / Day</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-slate-500">Current Level</div>
                  <div className="font-bold text-purple-700 mt-1">Beginner Python & Math</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-slate-500">Career Goal</div>
                  <div className="font-bold text-emerald-700 mt-1">AI/ML Engineer</div>
                </div>
              </div>

              <button
                onClick={handleQuickDemoAccess}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-purple-600/25 flex items-center gap-2"
              >
                <span>Launch Persona Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-md bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900">Alex's Active Learning Progress</span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-700">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> 12-Day Streak
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-700 font-medium mb-1">
                    <span>Phase 2: Mathematics & Statistics</span>
                    <span>28.5% Complete</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full w-[28.5%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500">Next Recommended Lesson</div>
                    <div className="font-bold text-slate-900">Vectors, Matrices & Dot Products</div>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-[10px] font-semibold">25 min</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SDG 4 ALIGNMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
          <Globe className="w-4 h-4 text-emerald-600" /> United Nations Sustainable Development Goal 4
        </div>
        <h3 className="text-3xl font-extrabold text-slate-900">Democratizing Quality AI Education for Every Student</h3>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
          SkillPilot AI eliminates educational inequality by providing high-quality, personalized AI mentorship, zero paywalls, and adaptive learning paths for every student regardless of background.
        </p>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="glass-card rounded-3xl p-12 border border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-white shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">Ready to Master AI Education?</h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of engineering students learning AI with a dedicated 24/7 personal AI companion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-purple-600/25 transition-all"
            >
              Get Started Now
            </Link>
            <button
              onClick={handleQuickDemoAccess}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-700 font-bold text-base rounded-2xl border border-slate-300 shadow-sm transition-all"
            >
              Explore Alex's Demo Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
