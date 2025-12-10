export type UserRole = 'student' | 'helper';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Helper extends User {
  university: string;
  program: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  skills: string[];
  subjects: string[];
  completedSessions: number;
  portfolio: string[];
}

export interface Booking {
  id: string;
  helperId: string;
  studentId: string;
  helperName: string; // Denormalized for ease
  studentName: string;
  date: string;
  time: string;
  duration: number; // in hours
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  subject: string;
}

export interface Review {
  id: string;
  helperId: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide icon name
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'booking' | 'message' | 'system';
}