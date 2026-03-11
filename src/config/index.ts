export const config = {
  apiMode: (process.env.NEXT_PUBLIC_API_MODE || 'mock') as 'mock' | 'real',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  appName: 'DevBlog',
  appDescription: 'A modern blog platform for developers',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  xpConfig: {
    readPost: 10,
    likePost: 5,
    likeIdea: 3,
    dailyVisit: 15,
    levelThreshold: 100,
  },
  pagination: {
    defaultLimit: 12,
  },
  mockDelay: {
    min: 200,
    max: 600,
  },
} as const;

export const XP_LEVELS = [
  { level: 1, minXp: 0, title: 'Newcomer' },
  { level: 2, minXp: 100, title: 'Reader' },
  { level: 3, minXp: 300, title: 'Explorer' },
  { level: 4, minXp: 600, title: 'Contributor' },
  { level: 5, minXp: 1000, title: 'Enthusiast' },
  { level: 6, minXp: 1500, title: 'Expert' },
  { level: 7, minXp: 2500, title: 'Master' },
  { level: 8, minXp: 4000, title: 'Legend' },
  { level: 9, minXp: 6000, title: 'Guru' },
  { level: 10, minXp: 10000, title: 'Sage' },
] as const;

export const BADGE_DEFINITIONS: { id: string; name: string; description: string; icon: string }[] = [
  { id: 'first-read', name: 'First Read', description: 'Read your first article', icon: '📖' },
  { id: '5-articles', name: 'Bookworm', description: 'Read 5 articles', icon: '📚' },
  { id: '10-likes', name: 'Generous', description: 'Give 10 likes', icon: '❤️' },
  { id: 'streak-3', name: 'On Fire', description: '3-day visit streak', icon: '🔥' },
  { id: 'streak-7', name: 'Dedicated', description: '7-day visit streak', icon: '⭐' },
  { id: 'first-post', name: 'Author', description: 'Write your first post', icon: '✍️' },
];
