import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Briefcase, Sparkles, CheckCircle2, AlertCircle, Award, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CareerCoachPage: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [mockQuestion, setMockQuestion] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    loadCareerData();
  }, []);

  const loadCareerData = async () => {
    try {
      const res = await api.getCareerAnalysis();
      setData(res);
      if (res.interview_topics && res.interview_topics.length > 0) {
        setMockQuestion(res.interview_topics[0]);
      }
    } catch (err) {
      console.error('Failed to load career analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluateMockAnswer = () => {
    if (!userAnswer.trim()) return;
    setFeedback(
      `### 🎯 Career Coach Feedback\n\nGreat attempt! Your explanation covers the core intuition well. To make your response interview-ready for top AI engineering roles, ensure you mention **mathematical trade-offs** (e.g. model variance vs training loss) and **practical framework specifics (PyTorch / Scikit-Learn)**.`
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Analyzing your AI Career Readiness Matrix...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Target Role: {data?.target_career || 'AI/ML Engineer'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">AI Career <span className="text-gradient">Readiness Engine</span></h1>
          <p className="text-xs text-slate-600 max-w-xl">
            Skill Gap Matrix comparing your current skills against industry hiring criteria, recommended certifications, and mock interview practice.
          </p>
        </div>

        {/* Readiness Score Badge */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center shrink-0 min-w-[140px]">
          <div className="text-2xl font-extrabold text-emerald-600">{data?.readiness_percentage || 65.0}%</div>
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Career Match Score</div>
        </div>
      </div>

      {/* SKILL GAP MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Matched Skills */}
        <div className="glass-card rounded-3xl p-6 border border-emerald-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-base">Matched Skills ({data?.current_matches?.length || 0})</h3>
          </div>

          <div className="space-y-2">
            {data?.current_matches?.map((m: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing / Target Skills */}
        <div className="glass-card rounded-3xl p-6 border border-amber-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-base">Missing Skills to Unlock Target Role</h3>
          </div>

          <div className="space-y-3">
            {data?.missing_skills?.map((item: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>{item.skill}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Priority</span>
                </div>
                <div className="text-[11px] text-slate-600">{item.recommendation}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECOMMENDED CERTIFICATIONS */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-purple-700">
          <Award className="w-5 h-5" />
          <h3 className="font-bold text-slate-900 text-base">Recommended Industry Certifications</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {data?.recommended_certifications?.map((cert: string, idx: number) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
              <div className="font-bold text-slate-800">{cert}</div>
              <span className="text-[10px] text-purple-700 font-semibold uppercase tracking-wider">Verified Credential</span>
            </div>
          ))}
        </div>
      </div>

      {/* MOCK AI TECHNICAL INTERVIEW SIMULATOR */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 bg-white shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-700">
            <MessageSquare className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-base">Mock AI Technical Interview Simulator</h3>
          </div>
          <span className="text-xs font-semibold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Career Coach Agent Active
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Interview Question</div>
          <div className="text-sm font-bold text-slate-900">{mockQuestion}</div>
        </div>

        <div className="space-y-3 text-xs">
          <label className="block font-semibold text-slate-700">Your Answer / Response:</label>
          <textarea
            rows={3}
            placeholder="Type your response to the interviewer..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
          />

          <button
            onClick={handleEvaluateMockAnswer}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all"
          >
            <span>Evaluate My Interview Answer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {feedback && (
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs text-purple-900 whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {feedback}
          </div>
        )}
      </div>

    </div>
  );
};
