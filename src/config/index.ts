export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  appName: 'DevBlog',
  appDescription: 'A modern blog platform for developers',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  pagination: {
    defaultLimit: 12,
  },
} as const;
