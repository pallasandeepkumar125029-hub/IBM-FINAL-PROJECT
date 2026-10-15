import React from 'react';
import { ArrowRight, CheckCircle2, UserCheck, Compass, MessageSquare, Trophy, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    { step: '01', title: 'Onboarding & Skill Assessment', desc: 'Tell SkillPilot your college degree, career goal (e.g. AI/ML Engineer), and daily study availability (30m to 3h+).' },
    { step: '02', title: 'AI Roadmap Generation', desc: 'Our engine creates a structured 8-phase timeline tailored specifically to your skill baseline.' },
    { step: '03', title: 'Learn with Multi-Agent AI', desc: 'Study interactive markdown lessons, ask your Tutor Agent doubts using Explain → Example → Practice loops.' },
    { step: '04', title: 'Adaptive Quizzes & Projects', desc: 'Validate your knowledge with dynamic quizzes that adapt difficulty in real-time, and complete capstone projects.' },
    { step: '05', title: 'Career Guidance & Interview Prep', desc: 'Analyze your Skill Gap Matrix and simulate technical mock interviews to land internships and full-time AI roles.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">How <span className="text-gradient">SkillPilot AI</span> Works</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          From beginner student to production-ready AI Engineer in 5 seamless steps.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {steps.map((s, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex items-start gap-6">
            <div className="text-3xl font-extrabold text-purple-600 font-mono">{s.step}</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <Link to="/register" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-md hover:bg-purple-700 transition-all hover:shadow-purple-500/20 inline-flex items-center gap-2">
          Start Your Journey <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
