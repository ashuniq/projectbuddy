import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { MOCK_HELPERS } from '../constants';
import { HelperCard } from '../components/HelperCard';
import { Input } from '../components/ui/Input';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HelperDirectory: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const filteredHelpers = useMemo(() => {
    return MOCK_HELPERS.filter(helper => {
      const matchesSearch = helper.name.toLowerCase().includes(search.toLowerCase()) || 
                            helper.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory ? helper.subjects.includes(selectedCategory) : true;
      const matchesPrice = helper.hourlyRate >= priceRange[0] && helper.hourlyRate <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, selectedCategory, priceRange]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile Filters Toggle */}
      <div className="md:hidden">
        <Button variant="outline" fullWidth onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} className="mr-2" /> Filters
        </Button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`w-full md:w-64 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 h-fit ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory('')} className="text-xs text-red-500 hover:underline">Clear</button>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Price per Hour</label>
            <div className="flex items-center space-x-2">
               <span className="text-sm text-gray-500">${priceRange[0]}</span>
               <input 
                 type="range" 
                 min="0" max="100" 
                 value={priceRange[1]} 
                 onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                 className="w-full accent-primary-600" 
               />
               <span className="text-sm text-gray-500">${priceRange[1]}</span>
            </div>
          </div>

          <div>
             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Subject</label>
             <div className="space-y-2">
               {['Science Projects', 'Coding', 'Math & Logic', 'Essay Writing'].map(cat => (
                 <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                   <input 
                     type="checkbox" 
                     checked={selectedCategory === cat} 
                     onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                     className="rounded text-primary-600 focus:ring-primary-500 border-gray-300" 
                   />
                   <span className="text-sm text-gray-600 dark:text-gray-400">{cat}</span>
                 </label>
               ))}
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="relative mb-6">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
           <Input 
             placeholder="Search by name, skill, or university..." 
             className="pl-10"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>

        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredHelpers.length} helpers
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredHelpers.map(helper => (
            <HelperCard key={helper.id} helper={helper} />
          ))}
          {filteredHelpers.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
               No helpers found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};