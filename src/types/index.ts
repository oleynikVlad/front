// ============ User Types ============
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  xp: number;
  level: number;
  badges: Badge[];
  streak: number;
  lastVisit: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ============ Post Types ============
export interface Post {
  id: string;
  slug: string;
  title: string;
  preview: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  tags: string[];
  readingTime: number;
  likes: number;
  views: number;
  liked: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCreate {
  title: string;
  preview: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
}

export interface Author {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

export type Category =
  | 'technology'
  | 'design'
  | 'programming'
  | 'devops'
  | 'ai'
  | 'web'
  | 'mobile'
  | 'career'
  | 'tutorial'
  | 'opinion';

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'programming', label: 'Programming' },
  { value: 'devops', label: 'DevOps' },
  { value: 'ai', label: 'AI & ML' },
  { value: 'web', label: 'Web Dev' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'career', label: 'Career' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'opinion', label: 'Opinion' },
];

// ============ Todo Types ============
export interface TodoIdea {
  id: string;
  title: string;
  description: string;
  author: Author;
  likes: number;
  liked: boolean;
  category: Category;
  createdAt: string;
}

// ============ Search Types ============
export interface SearchFilters {
  query?: string;
  category?: Category;
  readingTimeMin?: number;
  readingTimeMax?: number;
  minLikes?: number;
  dateFrom?: string;
  dateTo?: string;
  author?: string;
}

export type SortOption = 'recent' | 'popular' | 'liked';

// ============ Pagination ============
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ============ Gamification ============
export interface XPEvent {
  type: 'read_post' | 'like_post' | 'like_idea' | 'daily_visit';
  xp: number;
  description: string;
}

export interface GamificationState {
  xp: number;
  level: number;
  badges: Badge[];
  streak: number;
  lastVisit: string;
  xpHistory: XPEvent[];
}

// ============ Notification ============
export interface Notification {
  id: string;
  type: 'xp' | 'badge' | 'streak' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ============ API ============
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
