const API_BASE = '/api/v1';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('skillpilot_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network request failed' }));
    throw new Error(errorData.detail || `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Auth
  login: (credentials: any) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData: any) => fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => fetchWithAuth('/auth/me'),

  // Profile & Onboarding
  getProfile: () => fetchWithAuth('/users/profile'),
  submitOnboarding: (data: any) => fetchWithAuth('/users/onboarding', { method: 'POST', body: JSON.stringify(data) }),

  // Learning Path & Lessons
  getLearningPath: () => fetchWithAuth('/learning/path'),
  getLesson: (id: number) => fetchWithAuth(`/learning/lessons/${id}`),
  completeLesson: (id: number) => fetchWithAuth(`/learning/lessons/${id}/complete`, { method: 'POST' }),
  generateRoadmap: () => fetchWithAuth('/learning/generate-roadmap', { method: 'POST' }),

  // AI Tutor & Agents
  sendTutorQuery: (data: { conversation_id?: number; message: string; preferred_agent?: string }) =>
    fetchWithAuth('/tutor/chat', { method: 'POST', body: JSON.stringify(data) }),
  getConversations: () => fetchWithAuth('/tutor/conversations'),
  getConversationHistory: (id: number) => fetchWithAuth(`/tutor/conversations/${id}`),

  // Quizzes
  getQuizzes: () => fetchWithAuth('/quizzes/'),
  getQuizById: (id: number) => fetchWithAuth(`/quizzes/${id}`),
  submitQuiz: (data: { quiz_id: number; user_answers: Record<string, string>; time_taken_seconds: number }) =>
    fetchWithAuth('/quizzes/submit', { method: 'POST', body: JSON.stringify(data) }),

  // Projects
  getProjects: () => fetchWithAuth('/projects/'),
  getProjectById: (id: number) => fetchWithAuth(`/projects/${id}`),
  submitProject: (data: { project_id: number; repo_url?: string; notes?: string }) =>
    fetchWithAuth('/projects/submit', { method: 'POST', body: JSON.stringify(data) }),

  // Career Coach
  getCareerAnalysis: () => fetchWithAuth('/career/analysis'),

  // AI Updates
  getAIUpdates: () => fetchWithAuth('/updates/'),
  getAIUpdateById: (id: number) => fetchWithAuth(`/updates/${id}`),

  // Progress Dashboard
  getDashboardSummary: () => fetchWithAuth('/progress/dashboard'),

  // RAG Knowledge Base
  getRAGDocuments: () => fetchWithAuth('/rag/documents'),
  searchRAG: (query: string) => fetchWithAuth('/rag/search', { method: 'POST', body: JSON.stringify({ query }) }),

  // Admin
  getAdminMetrics: () => fetchWithAuth('/admin/metrics'),
  getAdminUsers: () => fetchWithAuth('/admin/users'),
};
