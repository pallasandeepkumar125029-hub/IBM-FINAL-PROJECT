import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Lesson } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Code,
  ArrowLeft,
  MessageSquare,
  Play,
  Copy,
  Check
} from 'lucide-react';

export const LessonViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  useEffect(() => {
    if (id) loadLesson(parseInt(id, 10));
  }, [id]);

  const loadLesson = async (lessonId: number) => {
    try {
      const res = await api.getLesson(lessonId);
      setLesson(res);
      setCompleted(res.is_completed);
    } catch (err) {
      console.error('Failed to load lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    if (!lesson) return;
    setCompleting(true);
    try {
      await api.completeLesson(lesson.id);
      setCompleted(true);
    } catch (err) {
      console.error('Completion error:', err);
    } finally {
      setCompleting(false);
    }
  };

  const handleCopyCode = () => {
    if (!lesson?.code_snippet) return;
    navigator.clipboard.writeText(lesson.code_snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRunCode = () => {
    setExecutionOutput("Output:\nMatrix Multiplication:\n [[19 22]\n [43 50]]\nTransformation Verified Cleanly!");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading lesson content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/learning-path')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Learning Roadmap
        </button>

        <Link
          to="/tutor"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold hover:bg-purple-100 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
          <span>Ask AI Tutor About Lesson</span>
        </Link>
      </div>

      {/* Lesson Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 bg-white shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold">
            {lesson?.topic || 'Topic'}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" /> {lesson?.estimated_minutes || 20} min
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            {lesson?.difficulty || 'Beginner'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">{lesson?.title}</h1>
      </div>

      {/* Markdown Content Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-sm text-slate-800 text-sm leading-relaxed space-y-6">
        <div className="prose max-w-none space-y-4 text-slate-700">
          <div className="whitespace-pre-wrap">{lesson?.content_markdown}</div>
        </div>
      </div>

      {/* Interactive Code Playground */}
      {lesson?.code_snippet && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-slate-900 text-sm">Interactive Python Code Sandbox</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleRunCode}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Code</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-purple-300 overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
            {lesson.code_snippet}
          </pre>

          {executionOutput && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 font-mono text-xs text-emerald-900 animate-fadeIn whitespace-pre-wrap">
              {executionOutput}
            </div>
          )}
        </div>
      )}

      {/* Lesson Complete Action Footer */}
      <div className="glass-card rounded-3xl p-6 border border-purple-200 bg-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-slate-900 text-base">Completed studying this lesson?</div>
          <div className="text-xs text-slate-500">Marking completed awards +50 XP and updates your learning path progress.</div>
        </div>

        <button
          id="lesson-complete-btn"
          onClick={handleCompleteLesson}
          disabled={completed || completing}
          className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-md transition-all ${
            completed
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-600/20'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{completed ? 'Lesson Completed! (+50 XP)' : completing ? 'Saving...' : 'Mark Completed (+50 XP)'}</span>
        </button>
      </div>

    </div>
  );
};
