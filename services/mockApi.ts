import { MOCK_HELPERS, MOCK_REVIEWS } from '../constants';
import { Helper, Review } from '../types';

export const mockApi = {
  getHelpers: async (category?: string): Promise<Helper[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    if (!category) return MOCK_HELPERS;
    return MOCK_HELPERS.filter(h => h.subjects.includes(category) || h.skills.includes(category));
  },

  getHelperById: async (id: string): Promise<Helper | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_HELPERS.find(h => h.id === id);
  },

  getReviews: async (helperId: string): Promise<Review[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_REVIEWS.filter(r => r.helperId === helperId);
  },

  createBooking: async (data: any): Promise<{ success: boolean; data: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, data };
  },

  sendMessage: async (message: string): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message };
  }
};