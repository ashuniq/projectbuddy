import { Category, Helper, Review, Notification } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Science Projects', icon: 'FlaskConical', color: 'bg-blue-100 text-blue-600' },
  { id: '2', name: 'Math & Logic', icon: 'Calculator', color: 'bg-emerald-100 text-emerald-600' },
  { id: '3', name: 'Essay Writing', icon: 'PenTool', color: 'bg-amber-100 text-amber-600' },
  { id: '4', name: 'Coding', icon: 'Code', color: 'bg-purple-100 text-purple-600' },
  { id: '5', name: 'Robotics', icon: 'Bot', color: 'bg-red-100 text-red-600' },
  { id: '6', name: 'Arts & Crafts', icon: 'Palette', color: 'bg-pink-100 text-pink-600' },
  { id: '7', name: 'History', icon: 'Landmark', color: 'bg-orange-100 text-orange-600' },
  { id: '8', name: 'Languages', icon: 'Languages', color: 'bg-cyan-100 text-cyan-600' },
];

export const MOCK_HELPERS: Helper[] = [
  {
    id: 'h1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'helper',
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    university: 'MIT',
    program: 'Computer Science, B.S.',
    bio: 'Experienced coding tutor specializing in Python and Scratch for kids. I love making technology accessible!',
    hourlyRate: 35,
    rating: 4.9,
    reviewCount: 42,
    skills: ['Python', 'Scratch', 'Web Development', 'Math'],
    subjects: ['Coding', 'Math & Logic'],
    completedSessions: 156,
    portfolio: ['https://picsum.photos/seed/p1/400/300', 'https://picsum.photos/seed/p2/400/300']
  },
  {
    id: 'h2',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'helper',
    avatar: 'https://picsum.photos/seed/james/200/200',
    university: 'Stanford',
    program: 'Mechanical Engineering, M.S.',
    bio: 'I help students build amazing working models and robotics projects. Let\'s build something cool together.',
    hourlyRate: 45,
    rating: 5.0,
    reviewCount: 28,
    skills: ['Robotics', 'Physics', '3D Modeling', 'Circuitry'],
    subjects: ['Robotics', 'Science Projects'],
    completedSessions: 89,
    portfolio: ['https://picsum.photos/seed/p3/400/300']
  },
  {
    id: 'h3',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'helper',
    avatar: 'https://picsum.photos/seed/emily/200/200',
    university: 'Columbia University',
    program: 'English Literature, B.A.',
    bio: 'Passionate about storytelling and essay structuring. I can help with college essays and creative writing projects.',
    hourlyRate: 30,
    rating: 4.7,
    reviewCount: 115,
    skills: ['Creative Writing', 'Essay Editing', 'Public Speaking'],
    subjects: ['Essay Writing', 'Languages'],
    completedSessions: 310,
    portfolio: []
  },
  {
    id: 'h4',
    name: 'Michael Chang',
    email: 'michael@example.com',
    role: 'helper',
    avatar: 'https://picsum.photos/seed/michael/200/200',
    university: 'CalTech',
    program: 'Physics, Ph.D. Candidate',
    bio: 'Making complex physics concepts simple and fun. Great at science fair experiments.',
    hourlyRate: 55,
    rating: 4.8,
    reviewCount: 15,
    skills: ['Physics', 'Calculus', 'Data Analysis'],
    subjects: ['Science Projects', 'Math & Logic'],
    completedSessions: 45,
    portfolio: ['https://picsum.photos/seed/p4/400/300']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    helperId: 'h1',
    authorName: 'Parent of Alex',
    rating: 5,
    comment: 'Sarah was amazing! Alex finally understands loops in Python. Highly recommended.',
    date: '2023-10-15'
  },
  {
    id: 'r2',
    helperId: 'h1',
    authorName: 'Lisa M.',
    rating: 4,
    comment: 'Great session, very patient.',
    date: '2023-10-12'
  },
  {
    id: 'r3',
    helperId: 'h2',
    authorName: 'Tom H.',
    rating: 5,
    comment: 'The robot arm project was a huge success at the science fair thanks to James!',
    date: '2023-09-28'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Booking Confirmed',
    message: 'Your session with Sarah Chen is confirmed for tomorrow at 4:00 PM.',
    date: '2h ago',
    read: false,
    type: 'booking'
  },
  {
    id: 'n2',
    title: 'New Message',
    message: 'James Wilson sent you a message about the project materials.',
    date: '5h ago',
    read: true,
    type: 'message'
  }
];