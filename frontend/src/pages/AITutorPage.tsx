import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { AIMessage } from '../types';
import {
  Sparkles,
  Send,
  Bot,
  User,
  BookOpen,
  Brain,
  Briefcase,
  Award,
  Clock,
  Globe,
  Trash2
} from 'lucide-react';

export const AITutorPage: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      sender: 'assistant',
      agent_type: 'tutor',
      agent_name: 'Tutor Agent 👨‍🏫',
      message: `# 👋 Hello! I am your SkillPilot AI Tutor

I am here to guide you step-by-step through Python, Mathematics for AI, Neural Networks, and Generative AI!

### How we'll learn together:
1. **Explain**: Simple intuition behind complex concepts.
2. **Example**: Real-world code & math formulations.
3. **Ask**: Interactive follow-up questions.
4. **Practice**: Hands-on coding exercises.

What concept or question would you like to explore today?`,
      suggested_actions: [
        'Explain Backpropagation step-by-step',
        'What is Matrix Multiplication used for in AI?',
        'How does RAG work with Vector Databases?'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('auto');
  const [conversationId, setConversationId] = useState<number | undefined>(undefined);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const agentsList = [
    { id: 'auto', name: 'Auto Orchestrator', icon: Sparkles, color: 'text-purple-400' },
    { id: 'tutor', name: 'Tutor Agent', icon: Bot, color: 'text-indigo-400' },
    { id: 'research', name: 'Research Agent', icon: Brain, color: 'text-cyan-400' },
    { id: 'career', name: 'Career Agent', icon: Briefcase, color: 'text-pink-400' },
    { id: 'quiz', name: 'Quiz Master', icon: Award, color: 'text-amber-400' },
    { id: 'reminder', name: 'Reminder Agent', icon: Clock, color: 'text-emerald-400' },
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || sending) return;

    const userMsg: AIMessage = {
      sender: 'user',
      agent_type: selectedAgent,
      message: text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setSending(true);

    try {
      const res = await api.sendTutorQuery({
        conversation_id: conversationId,
        message: text,
        preferred_agent: selectedAgent
      });

      if (res.conversation_id) setConversationId(res.conversation_id);

      const assistantMsg: AIMessage = {
        sender: 'assistant',
        agent_type: res.agent_type,
        agent_name: res.agent_name,
        message: res.message,
        suggested_actions: res.suggested_actions,
        rag_sources: res.rag_sources
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          agent_type: 'tutor',
          agent_name: 'Tutor Agent 👨‍🏫',
          message: '⚠️ Sorry, I encountered a temporary network glitch while processing your question. Please try asking again!'
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>Multi-Agent</span> <span className="text-gradient">AI Tutor</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Engineered around UN SDG 4 Quality Education — Patient, structured AI mentorship.
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
            setConversationId(undefined);
          }}
          className="px-3.5 py-1.5 rounded-xl bg-white text-slate-600 hover:text-slate-900 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Agent Selector Tabs */}
      <div className="glass-card rounded-2xl p-2 border border-slate-200 bg-white shadow-sm flex overflow-x-auto gap-1">
        {agentsList.map((agent) => {
          const Icon = agent.icon;
          const active = selectedAgent === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-purple-100 text-purple-800 border border-purple-300 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${active ? 'text-purple-700' : 'text-slate-500'}`} />
              <span>{agent.name}</span>
            </button>
          );
        })}
      </div>

      {/* CHAT MESSAGES DISPLAY */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 border border-slate-200 bg-white shadow-sm min-h-[480px] max-h-[600px] overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 text-xs leading-relaxed ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
              
              {/* Message Header */}
              {msg.sender === 'assistant' && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-700">
                  <span>{msg.agent_name || 'AI Tutor Agent'}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-slate-500">SDG 4 Mentorship</span>
                </div>
              )}

              {/* RAG Knowledge Citation Pill */}
              {msg.rag_sources && msg.rag_sources.length > 0 && (
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-indigo-700">
                    <Globe className="w-3 h-3" />
                    <span>RAG Document Source: {msg.rag_sources[0].title}</span>
                  </div>
                  <div className="text-[10px] text-slate-600 line-clamp-2">{msg.rag_sources[0].content}</div>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white font-medium shadow-md shadow-purple-600/20 rounded-tr-none'
                    : 'bg-slate-50 text-slate-900 border border-slate-200 rounded-tl-none font-sans'
                }`}
              >
                {msg.message}
              </div>

              {/* Suggested Actions Chips */}
              {msg.suggested_actions && msg.suggested_actions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggested_actions.map((act, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => handleSend(act)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-[11px] font-semibold transition-all text-left shadow-sm"
                    >
                      💬 {act}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {sending && (
          <div className="flex items-center gap-3 text-xs text-purple-700 font-semibold pl-2 animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin text-purple-600" />
            <span>Agent Orchestrator is synthesizing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="glass-card rounded-2xl p-2 border border-slate-200 bg-white shadow-sm flex items-center gap-2"
      >
        <input
          id="tutor-chat-input"
          type="text"
          placeholder="Ask your AI Tutor anything (e.g. 'Explain Matrix Dot Product' or 'Give me a Python quiz')..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={sending}
          className="flex-1 bg-transparent border-none text-xs text-slate-900 px-4 py-3 focus:outline-none placeholder:text-slate-400"
        />

        <button
          id="tutor-send-btn"
          type="submit"
          disabled={sending || !inputMessage.trim()}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md shadow-purple-600/20 shrink-0"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
