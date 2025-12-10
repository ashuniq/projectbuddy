import React from 'react';
import { Link } from 'react-router-dom';
import { Star, GraduationCap, MapPin } from 'lucide-react';
import { Helper } from '../types';
import { Button } from './ui/Button';

interface HelperCardProps {
  helper: Helper;
}

export const HelperCard: React.FC<HelperCardProps> = ({ helper }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={helper.avatar} alt={helper.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">{helper.name}</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
              <GraduationCap size={14} className="mr-1" />
              <span className="truncate max-w-[120px]">{helper.university}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
          <Star size={14} className="text-yellow-500 fill-current" />
          <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 ml-1">{helper.rating}</span>
          <span className="text-xs text-gray-400 ml-1">({helper.reviewCount})</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-grow">
        {helper.bio}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {helper.skills.slice(0, 3).map(skill => (
          <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs rounded-full">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${helper.hourlyRate}</span>
          <span className="text-xs text-gray-500">/hr</span>
        </div>
        <Link to={`/helper/${helper.id}`}>
          <Button size="sm" variant="secondary">View Profile</Button>
        </Link>
      </div>
    </div>
  );
};