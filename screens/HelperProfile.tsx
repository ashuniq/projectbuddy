import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_HELPERS, MOCK_REVIEWS } from '../constants';
import { Helper, Review } from '../types';
import { Button } from '../components/ui/Button';
import { Star, MapPin, GraduationCap, Clock, CheckCircle } from 'lucide-react';

export const HelperProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [helper, setHelper] = useState<Helper | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Simulating API fetch
    const h = MOCK_HELPERS.find(h => h.id === id);
    if (h) {
        setHelper(h);
        setReviews(MOCK_REVIEWS.filter(r => r.helperId === h.id));
    }
  }, [id]);

  if (!helper) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       {/* Header Card */}
       <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start">
          <img src={helper.avatar} alt={helper.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-50 dark:border-slate-800" />
          
          <div className="flex-1 space-y-3">
             <div className="flex justify-between items-start">
                <div>
                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{helper.name}</h1>
                   <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                      <GraduationCap size={16} className="mr-1" />
                      <span>{helper.program} at {helper.university}</span>
                   </div>
                </div>
                <div className="text-right hidden md:block">
                   <div className="text-2xl font-bold text-primary-600">${helper.hourlyRate}</div>
                   <div className="text-sm text-gray-500">per hour</div>
                </div>
             </div>

             <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                   <Star size={14} className="text-yellow-500 fill-current mr-1" />
                   <span className="font-bold text-yellow-700 dark:text-yellow-500">{helper.rating}</span>
                   <span className="text-gray-400 ml-1">({helper.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-500">
                   <Clock size={14} className="mr-1" />
                   <span>{helper.completedSessions} sessions</span>
                </div>
             </div>

             <div className="flex flex-wrap gap-2 pt-2">
                {helper.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                    {skill}
                  </span>
                ))}
             </div>
          </div>
       </div>

       <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
             {/* About */}
             <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold mb-4">About Me</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{helper.bio}</p>
             </div>

             {/* Portfolio */}
             {helper.portfolio.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                   <h2 className="text-lg font-bold mb-4">Project Portfolio</h2>
                   <div className="grid grid-cols-2 gap-4">
                      {helper.portfolio.map((img, idx) => (
                        <img key={idx} src={img} alt="Portfolio" className="rounded-lg object-cover h-40 w-full" />
                      ))}
                   </div>
                </div>
             )}

             {/* Reviews */}
             <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {reviews.length > 0 ? reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                       <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{review.authorName}</span>
                          <span className="text-xs text-gray-400">{review.date}</span>
                       </div>
                       <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} size={12} className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"} />
                          ))}
                       </div>
                       <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  )) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
             </div>
          </div>

          {/* Sidebar Action */}
          <div className="md:col-span-1">
             <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 sticky top-24 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Book a Session</h3>
                <div className="space-y-4 mb-6">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Hourly Rate</span>
                      <span className="font-semibold">${helper.hourlyRate}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                      <span className="font-semibold text-green-600">~1 hour</span>
                   </div>
                </div>
                
                <Button fullWidth onClick={() => navigate(`/book/${helper.id}`)}>
                  Check Availability
                </Button>
                <Button fullWidth variant="outline" className="mt-3" onClick={() => navigate('/messages')}>
                  Message
                </Button>
             </div>
          </div>
       </div>
    </div>
  );
};