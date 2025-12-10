import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore, useUIStore } from '../store';
import { Sun, Moon, Home, Search, MessageSquare, Calendar, User, LogOut, Bell, Briefcase } from 'lucide-react';
import { Button } from './ui/Button';

export const Layout: React.FC = () => {
  const { darkMode, toggleDarkMode, notifications } = useUIStore();
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Dark Mode Side Effects
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex flex-col items-center justify-center space-y-1 w-full p-2 rounded-lg transition-colors ${
          isActive 
            ? 'text-primary-600 dark:text-primary-400' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
        }`}
      >
        <Icon size={20} />
        <span className="text-xs font-medium">{label}</span>
      </Link>
    );
  };

  if (!isAuthenticated && !location.pathname.startsWith('/login') && !location.pathname.startsWith('/signup') && location.pathname !== '/') {
    // Basic protection (redirect logic handled inside screens mostly, but safe fallback)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Top Navigation (Desktop) */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">ProjectBuddy</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated && (
                <>
                   <Link to="/home" className="text-sm font-medium hover:text-primary-600">Home</Link>
                   {user?.role === 'student' && <Link to="/search" className="text-sm font-medium hover:text-primary-600">Find Helpers</Link>}
                   {user?.role === 'helper' && <Link to="/dashboard" className="text-sm font-medium hover:text-primary-600">Dashboard</Link>}
                   <Link to="/messages" className="text-sm font-medium hover:text-primary-600">Messages</Link>
                </>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAuthenticated && (
                <>
                  <Link to="/notifications" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 relative">
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    )}
                  </Link>
                  <div className="hidden md:flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                    </div>
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                        {user?.name.charAt(0)}
                      </div>
                    )}
                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              )}
              
              {!isAuthenticated && (
                 <div className="flex space-x-2">
                   <Link to="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
                   <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
                 </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 mb-16 md:mb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 pb-safe">
          <div className="flex justify-around items-center h-16 px-2">
            <NavItem to="/home" icon={Home} label="Home" />
            {user?.role === 'student' ? (
              <NavItem to="/search" icon={Search} label="Search" />
            ) : (
              <NavItem to="/dashboard" icon={Briefcase} label="Work" />
            )}
            <NavItem to="/messages" icon={MessageSquare} label="Chat" />
            <NavItem to="/settings" icon={User} label="Profile" />
          </div>
        </div>
      )}
    </div>
  );
};