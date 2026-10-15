import React from 'react';
import { BookOpen, BrainCircuit, Award, Briefcase, Newspaper, Code, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">SkillPilot AI <span className="text-gradient">Capabilities</span></h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Built around UN SDG 4 — Quality Education. Every feature is designed to empower engineering students to master modern AI technologies autonomously.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-3xl p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all space-y-4">
          <BookOpen className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-slate-900">Personalized AI Roadmaps</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tailor-made 8-phase AI curriculum adjusting dynamically to student velocity, quiz scores, and daily study availability.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all space-y-4">
          <BrainCircuit className="w-8 h-8 text-indigo-600" />
          <h3 className="text-2xl font-bold text-slate-900">Multi-Agent AI Orchestrator</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            5 specialized agents working in unison: Tutor Agent for concepts, Research Agent for breakthroughs, Career Agent for readiness, Quiz Master for assessment, and Reminder Agent for streaks.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all space-y-4">
          <Award className="w-8 h-8 text-amber-600" />
          <h3 className="text-2xl font-bold text-slate-900">Adaptive Quiz Engine</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Question difficulty scales dynamically. Scores over 85% unlock advanced topics; scores under 60% trigger instant simplified review explanations.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all space-y-4">
          <Briefcase className="w-8 h-8 text-pink-600" />
          <h3 className="text-2xl font-bold text-slate-900">Career Readiness & Mock Interviews</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Real-time Skill Gap matrix matching student skills against AI/ML Engineer job specs. Practice technical mock interview questions with instant agent feedback.
          </p>
        </div>
      </div>

      <div className="text-center pt-8">
        <Link to="/register" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-md hover:bg-purple-700 transition-all hover:shadow-purple-500/20 inline-block">
          Explore Features Live
        </Link>
      </div>
    </div>
  );
};
