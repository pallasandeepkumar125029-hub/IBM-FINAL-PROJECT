import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Project } from '../types';
import { Zap, Sparkles, Code, CheckCircle2, ExternalLink, Send } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await api.getProjects();
      setProjects(res);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    setSubmitting(true);
    try {
      const res = await api.submitProject({
        project_id: selectedProject.id,
        repo_url: repoUrl,
        notes: notes
      });
      setSubmitSuccess(res.message);
      await loadProjects();
      setTimeout(() => {
        setSelectedProject(null);
        setSubmitSuccess(null);
      }, 2000);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading project recommendations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-200 bg-white shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Hands-On Portfolio Builder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Project <span className="text-gradient">Recommendations</span></h1>
        <p className="text-xs text-slate-600 max-w-xl">
          Build production-grade capstone projects tailored to your target career goal. Submit your GitHub repository for automated code review.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-700 uppercase tracking-wider">{p.category}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                  {p.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{p.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{p.problem_statement}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.tech_stack?.map((t, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">⏱️ {p.duration_hours} Hours</span>
              
              <button
                onClick={() => setSelectedProject(p)}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  p.is_completed
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20'
                }`}
              >
                {p.is_completed ? <CheckCircle2 className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                <span>{p.is_completed ? 'Verified' : 'View & Submit'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMISSION MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 bg-white shadow-2xl max-w-2xl w-full space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">{selectedProject.difficulty} Project</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedProject.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <div className="font-bold text-slate-900 mb-1">Problem Statement:</div>
                <p className="leading-relaxed text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">{selectedProject.problem_statement}</p>
              </div>

              <div>
                <div className="font-bold text-slate-900 mb-1">Suggested Implementation Steps:</div>
                <ul className="space-y-1 pl-4 list-disc text-slate-600">
                  {selectedProject.steps?.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ul>
              </div>
            </div>

            {submitSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                {submitSuccess}
              </div>
            ) : (
              <form onSubmit={handleSubmitProject} className="space-y-4 text-xs pt-2 border-t border-slate-200">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">GitHub Repository URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/alexkumar/rag-assistant"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Implementation Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your tech stack implementation..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Verifying Code...' : 'Submit Project (+200 XP)'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
