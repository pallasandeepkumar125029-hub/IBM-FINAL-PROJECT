import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AIUpdate } from '../types';
import { Newspaper, Sparkles, ExternalLink, Globe, CheckCircle2, Award } from 'lucide-react';

export const AIUpdatesPage: React.FC = () => {
  const [updates, setUpdates] = useState<AIUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

  useEffect(() => {
    loadUpdates();
  }, []);

  const loadUpdates = async () => {
    try {
      const res = await api.getAIUpdates();
      setUpdates(res);
    } catch (err) {
      console.error('Failed to load AI updates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerQuiz = (updateId: number, selectedOpt: string, correctOpt: string) => {
    setQuizAnswers((prev) => ({ ...prev, [updateId]: selectedOpt }));
    setQuizResults((prev) => ({ ...prev, [updateId]: selectedOpt === correctOpt }));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Fetching latest AI research & news feed...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-sky-200 bg-white shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
          <Newspaper className="w-3.5 h-3.5 text-sky-600" />
          <span>Curated AI Research Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Daily AI <span className="text-gradient">Knowledge Updates</span></h1>
        <p className="text-xs text-slate-600 max-w-xl">
          Stay ahead of industry breakthroughs. Concise 60-second paper summaries, student impact breakdowns, and instant knowledge quizzes.
        </p>
      </div>

      {/* Feed Cards */}
      <div className="space-y-6">
        {updates.map((item) => (
          <div key={item.id} className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm space-y-6">
            
            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
                  {item.category}
                </span>
                <span className="text-slate-500">Source: {item.source}</span>
              </div>
              <span className="text-slate-500">{new Date(item.timestamp).toLocaleDateString()}</span>
            </div>

            {/* Title & Summary */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center justify-between gap-4">
                <span>{item.title}</span>
                {item.paper_url && (
                  <a
                    href={item.paper_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-purple-600 transition-colors shrink-0"
                    title="Read Original Paper"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </h2>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <div className="font-bold text-slate-900 mb-1">60-Second Summary:</div>
                <p>{item.summary}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 leading-relaxed">
                <div className="font-bold text-purple-700 mb-1">Why It Matters for Students:</div>
                <p>{item.why_it_matters}</p>
              </div>
            </div>

            {/* Instant 1-Question Quick Quiz */}
            {item.quiz && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-700">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Quick Knowledge Check</span>
                </div>
                <div className="font-semibold text-slate-900">{item.quiz.question}</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.quiz.options?.map((opt, oIdx) => {
                    const isSelected = quizAnswers[item.id] === opt;
                    const isCorrect = quizResults[item.id];

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerQuiz(item.id, opt, item.quiz!.correct)}
                        className={`p-3 rounded-xl border text-left font-semibold text-[11px] transition-all ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                              : 'bg-rose-100 border-rose-400 text-rose-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizAnswers[item.id] && (
                  <div className="text-[11px] font-bold text-emerald-700 pt-1">
                    {quizResults[item.id] ? '✨ Correct! +10 Knowledge XP awarded.' : 'Incorrect. Try reviewing the 60-second summary above!'}
                  </div>
                )}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
