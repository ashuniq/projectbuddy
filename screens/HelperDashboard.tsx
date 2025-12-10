import React from 'react';
import { useAuthStore } from '../store';
import { Button } from '../components/ui/Button';
import { Settings, Calendar, DollarSign, Users } from 'lucide-react';

export const HelperDashboard: React.FC = () => {
  const { user } = useAuthStore();

  if (user?.role !== 'helper') return <div>Access Denied</div>;

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
             <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><DollarSign size={20} /></div>
                <h3 className="font-medium text-gray-500">Total Earnings</h3>
             </div>
             <p className="text-3xl font-bold">$1,240.00</p>
             <span className="text-sm text-green-500 font-medium">+12% this month</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
             <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Calendar size={20} /></div>
                <h3 className="font-medium text-gray-500">Upcoming Sessions</h3>
             </div>
             <p className="text-3xl font-bold">4</p>
             <span className="text-sm text-gray-500">Next: Tomorrow, 2 PM</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
             <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Users size={20} /></div>
                <h3 className="font-medium text-gray-500">Total Students</h3>
             </div>
             <p className="text-3xl font-bold">28</p>
          </div>
       </div>

       <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
             <h2 className="text-lg font-bold">Recent Bookings</h2>
             <Button size="sm" variant="ghost">View All</Button>
          </div>
          <table className="w-full">
             <thead className="bg-gray-50 dark:bg-slate-800 text-left text-xs uppercase text-gray-500">
                <tr>
                   <th className="px-6 py-3">Student</th>
                   <th className="px-6 py-3">Subject</th>
                   <th className="px-6 py-3">Date</th>
                   <th className="px-6 py-3">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[1, 2, 3].map(i => (
                   <tr key={i}>
                      <td className="px-6 py-4 font-medium">Alex Johnson</td>
                      <td className="px-6 py-4">Python Basics</td>
                      <td className="px-6 py-4">Oct 24, 2023</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};