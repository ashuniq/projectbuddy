import React from 'react';
import { useAuthStore, useUIStore } from '../store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Moon, Bell, Shield, LogOut } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { darkMode, toggleDarkMode } = useUIStore();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
         <h2 className="text-lg font-semibold border-b border-gray-100 dark:border-gray-800 pb-2">Profile Information</h2>
         <div className="grid gap-4">
            <Input label="Full Name" defaultValue={user?.name} />
            <Input label="Email" defaultValue={user?.email} disabled />
            <Button className="w-fit">Save Changes</Button>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
         <h2 className="text-lg font-semibold border-b border-gray-100 dark:border-gray-800 pb-2">Preferences</h2>
         
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <Moon className="text-gray-500" />
               <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-gray-500">Switch between light and dark themes</div>
               </div>
            </div>
            <button 
               onClick={toggleDarkMode}
               className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary-600' : 'bg-gray-300'}`}
            >
               <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${darkMode ? 'translate-x-6' : ''}`} />
            </button>
         </div>

         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <Bell className="text-gray-500" />
               <div>
                  <div className="font-medium">Notifications</div>
                  <div className="text-sm text-gray-500">Receive email updates</div>
               </div>
            </div>
             <button className="w-12 h-6 rounded-full bg-primary-600 relative">
               <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full translate-x-6" />
            </button>
         </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100" onClick={logout}>
            <LogOut size={16} className="mr-2" /> Log Out
          </Button>
      </div>
    </div>
  );
};