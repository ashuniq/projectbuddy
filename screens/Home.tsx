import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useBookingStore } from '../store';
import { CATEGORIES, MOCK_HELPERS } from '../constants';
import * as Icons from 'lucide-react';
import { HelperCard } from '../components/HelperCard';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { bookings } = useBookingStore();
  const navigate = useNavigate();

  // --- Student View ---
  if (user?.role === 'student') {
    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Hello, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-indigo-100 mb-6 max-w-lg">
            Ready to tackle your next project? Find the perfect mentor today.
          </p>
          <div className="relative max-w-xl">
             <input 
               type="text" 
               placeholder="What are you working on? (e.g., Physics, Essay)" 
               className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow-sm"
               onClick={() => navigate('/search')}
             />
             <Icons.Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Explore Categories</h2>
             <Button variant="ghost" size="sm" onClick={() => navigate('/search')}>View All</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.slice(0, 8).map((cat) => {
              const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
              return (
                <div 
                  key={cat.id} 
                  onClick={() => navigate(`/search?category=${cat.name}`)}
                  className="cursor-pointer group flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-all hover:shadow-md"
                >
                  <div className={`p-3 rounded-full mb-3 ${cat.color} bg-opacity-10`}>
                    <Icon size={24} />
                  </div>
                  <span className="font-medium text-sm text-center group-hover:text-primary-600">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Helpers */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Rated Helpers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_HELPERS.slice(0, 3).map(helper => (
              <HelperCard key={helper.id} helper={helper} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  // --- Helper View ---
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-start">
           <div>
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
             <p className="text-gray-500 text-sm">Welcome back, {user?.name}</p>
           </div>
           <Button onClick={() => navigate('/settings')}>Edit Profile</Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
             <div className="text-blue-600 dark:text-blue-400 mb-1 font-medium">Earnings</div>
             <div className="text-2xl font-bold text-gray-900 dark:text-white">$1,240</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
             <div className="text-green-600 dark:text-green-400 mb-1 font-medium">Sessions</div>
             <div className="text-2xl font-bold text-gray-900 dark:text-white">28</div>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
             <div className="text-amber-600 dark:text-amber-400 mb-1 font-medium">Rating</div>
             <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h2>
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <Icons.Calendar className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-gray-500">No upcoming sessions</p>
            <Button variant="ghost" className="mt-2">View Calendar</Button>
          </div>
        ) : (
          <div className="space-y-4">
             {/* Render booking cards here */}
          </div>
        )}
      </section>
    </div>
  );
};