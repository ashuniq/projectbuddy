import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleRoleSelect = (role: 'student' | 'helper') => {
    // In a real app, this would redirect to signup with role param
    // For this mock, we just direct to login/signup choice page or mock auth
    navigate('/signup');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Master your projects with <span className="text-primary-600">ProjectBuddy</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0">
            Connect with top university students to get expert help on school projects, essays, and STEM experiments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button onClick={() => handleRoleSelect('student')} size="lg" className="group">
              <BookOpen className="mr-2 h-5 w-5" />
              Find Help
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button onClick={() => handleRoleSelect('helper')} variant="outline" size="lg">
              <GraduationCap className="mr-2 h-5 w-5" />
              Become a Helper
            </Button>
          </div>
          
          <div className="pt-8 flex items-center justify-center md:justify-start gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Verified Tutors</span>
            </div>
             <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm">Secure Payments</span>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
             <div className="flex items-center space-x-4 mb-4">
               <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                 <img src="https://picsum.photos/seed/sarah/200/200" alt="Avatar" />
               </div>
               <div>
                 <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
                 <div className="h-3 w-24 bg-gray-100 dark:bg-slate-700 rounded"></div>
               </div>
             </div>
             <div className="space-y-2">
               <div className="h-3 w-full bg-gray-100 dark:bg-slate-700 rounded"></div>
               <div className="h-3 w-5/6 bg-gray-100 dark:bg-slate-700 rounded"></div>
               <div className="h-3 w-4/6 bg-gray-100 dark:bg-slate-700 rounded"></div>
             </div>
             <div className="mt-6 flex justify-between items-center">
                <div className="h-8 w-24 bg-primary-100 dark:bg-primary-900/30 rounded-lg"></div>
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 rounded-full bg-yellow-400"></div>)}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};