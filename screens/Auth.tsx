import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Chrome, Apple, ArrowLeft } from 'lucide-react';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'student' | 'helper'>('student');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // Check if we came from onboarding with a specific intention (simplified)
  React.useEffect(() => {
    if (location.pathname === '/signup') setIsLogin(false);
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(role);
      setIsLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            {isLogin ? 'Enter your details to access your account' : 'Join the community today'}
          </p>
        </div>

        {!isLogin && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                role === 'student'
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              I need help
            </button>
            <button
              type="button"
              onClick={() => setRole('helper')}
              className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                role === 'helper'
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              I want to help
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && <Input label="Full Name" placeholder="John Doe" required />}
          <Input label="Email" type="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" placeholder="••••••••" required />
          
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-900 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="w-full">
            <Chrome size={18} className="mr-2" /> Google
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <Apple size={18} className="mr-2" /> Apple
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};