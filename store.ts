import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Helper, Booking, Message, Notification } from './types';
import { MOCK_HELPERS, MOCK_NOTIFICATIONS } from './constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: 'student' | 'helper') => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (role) => {
        // Mock login
        const mockUser: User = role === 'helper' 
          ? MOCK_HELPERS[0] 
          : { id: 'u1', name: 'Alex Johnson', email: 'alex@student.com', role: 'student', avatar: 'https://picsum.photos/seed/alex/200/200' };
        
        set({ user: mockUser, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) => set((state) => ({ 
        user: state.user ? { ...state.user, ...updates } : null 
      })),
    }),
    { name: 'auth-storage' }
  )
);

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
    }),
    { name: 'booking-storage' }
  )
);

interface UIState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      notifications: MOCK_NOTIFICATIONS,
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      }))
    }),
    { name: 'ui-storage' }
  )
);

interface ChatState {
  messages: Record<string, Message[]>; // Keyed by chatId or partnerId
  sendMessage: (partnerId: string, text: string, senderId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {
    'h1': [
      { id: 'm1', senderId: 'h1', receiverId: 'u1', text: 'Hi! I saw your request for Python help.', timestamp: new Date(Date.now() - 86400000).toISOString(), isRead: true },
      { id: 'm2', senderId: 'u1', receiverId: 'h1', text: 'Yes, I am stuck on loops.', timestamp: new Date(Date.now() - 86000000).toISOString(), isRead: true },
    ]
  },
  sendMessage: (partnerId, text, senderId) => set((state) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId,
      receiverId: partnerId,
      text,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    return {
      messages: {
        ...state.messages,
        [partnerId]: [...(state.messages[partnerId] || []), newMessage]
      }
    };
  })
}));