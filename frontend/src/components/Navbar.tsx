import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Flame,
  Zap,
  BookOpen,
  MessageSquare,
  Award,
  Briefcase,
  TrendingUp,
  Newspaper,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Globe,
  ShieldAlert,
  Compass,
  ChevronDown,
  Settings
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary nav items shown directly on topbar
  const primaryAuthNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Compass },
    { name: 'My Path', path: '/learning-path', icon: BookOpen },
    { name: 'AI Tutor', path: '/tutor', icon: MessageSquare },
    { name: 'Quizzes', path: '/quizzes', icon: Award },
    { name: 'Projects', path: '/projects', icon: Zap },
    { name: 'Career', path: '/career', icon: Briefcase },
  ];

  // Secondary items in the "More" dropdown
  const secondaryAuthNavItems = [
    { name: 'AI Updates', path: '/ai-updates', icon: Newspaper, desc: 'Latest AI research & breakthroughs' },
    { name: 'Progress Analytics', path: '/progress', icon: TrendingUp, desc: 'XP history & learning velocity' },
    { name: 'Account Settings', path: '/settings', icon: Settings, desc: 'Preferences & notifications' },
    { name: 'Admin Portal', path: '/admin', icon: ShieldAlert, desc: 'Institutional telemetry & stats' },
  ];

  const publicNavItems = [
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About (SDG 4)', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isSecondaryActive = secondaryAuthNavItems.some((item) => isActive(item.path));

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-nowrap gap-2 sm:gap-4">
          
          {/* Left: Brand / Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
            <Link id="nav-logo-link" to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-[1.5px] shadow-md shadow-purple-500/15 group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full bg-white rounded-[9.5px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-600 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 whitespace-nowrap">
                SkillPilot <span className="text-gradient">AI</span>
              </span>
            </Link>

            <span className="hidden md:inline-flex whitespace-nowrap items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80">
              <Globe className="w-3 h-3 text-purple-600 shrink-0" /> SDG 4 Demo
            </span>
          </div>

          {/* Center: Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 shrink-0 whitespace-nowrap">
            {isAuthenticated ? (
              <>
                {primaryAuthNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      id={`nav-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      to={item.path}
                      className={`whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        active
                          ? 'bg-purple-50 text-purple-700 border border-purple-200/90 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-purple-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Dropdown for Secondary Navigation */}
                <div className="relative shrink-0" ref={dropdownRef}>
                  <button
                    id="nav-more-dropdown-btn"
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSecondaryActive || moreDropdownOpen
                        ? 'bg-purple-50 text-purple-700 border border-purple-200/90 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} />
                  </button>

                  {moreDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                        Tools & Analytics
                      </div>
                      {secondaryAuthNavItems.map((sItem) => {
                        const SIcon = sItem.icon;
                        const sActive = isActive(sItem.path);
                        return (
                          <Link
                            key={sItem.path}
                            to={sItem.path}
                            onClick={() => setMoreDropdownOpen(false)}
                            className={`flex items-start gap-2.5 p-2 rounded-xl text-xs transition-colors ${
                              sActive
                                ? 'bg-purple-50 text-purple-700 font-bold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <SIcon className={`w-4 h-4 mt-0.5 shrink-0 ${sActive ? 'text-purple-600' : 'text-slate-400'}`} />
                            <div>
                              <div className="font-semibold text-slate-900 whitespace-nowrap">{sItem.name}</div>
                              <div className="text-[10px] text-slate-500">{sItem.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  id={`nav-public-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  to={item.path}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.name}
                </Link>
              ))
            )}
          </div>

          {/* Right: Actions, Badges & Profile */}
          <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                {/* Streak Counter */}
                <div id="nav-streak-counter" className="whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-800 text-xs font-bold shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
                  <span>12 Days</span>
                </div>

                {/* XP Points */}
                <div id="nav-xp-counter" className="hidden sm:flex whitespace-nowrap items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-200/90 text-purple-800 text-xs font-bold shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-purple-600 fill-purple-200 shrink-0" />
                  <span>1,450 XP</span>
                </div>

                {/* Profile Link & Logout */}
                <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-slate-200 shrink-0 whitespace-nowrap">
                  <Link
                    id="nav-profile-button"
                    to="/profile"
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
                    title="View Profile"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
                      {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <span className="hidden xl:block text-xs font-semibold text-slate-700 max-w-[85px] truncate whitespace-nowrap">
                      {user?.full_name || 'Alex'}
                    </span>
                  </Link>

                  <button
                    id="nav-logout-btn"
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    title="Logout"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                <Link
                  id="nav-login-btn"
                  to="/login"
                  className="whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  id="nav-register-btn"
                  to="/register"
                  className="whitespace-nowrap px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-600/20 transition-all transform active:scale-95"
                >
                  Start Learning
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2">
          {isAuthenticated ? (
            <>
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Core Navigation
              </div>
              {primaryAuthNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive(item.path) ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="px-3 py-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 mt-2">
                Tools & Admin
              </div>
              {secondaryAuthNavItems.map((sItem) => (
                <Link
                  key={sItem.path}
                  to={sItem.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive(sItem.path) ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <sItem.icon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{sItem.name}</span>
                </Link>
              ))}
            </>
          ) : (
            publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                {item.name}
              </Link>
            ))
          )}
        </div>
      )}
    </nav>
  );
};
