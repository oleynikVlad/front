import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy');
}

export function formatRelativeDate(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function getLevelFromXp(xp: number): number {
  if (xp >= 10000) return 10;
  if (xp >= 6000) return 9;
  if (xp >= 4000) return 8;
  if (xp >= 2500) return 7;
  if (xp >= 1500) return 6;
  if (xp >= 1000) return 5;
  if (xp >= 600) return 4;
  if (xp >= 300) return 3;
  if (xp >= 100) return 2;
  return 1;
}

export function getXpForNextLevel(xp: number): { current: number; needed: number; progress: number } {
  const thresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000];
  const level = getLevelFromXp(xp);
  if (level >= 10) return { current: xp, needed: 10000, progress: 100 };
  const currentThreshold = thresholds[level - 1];
  const nextThreshold = thresholds[level];
  const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return { current: xp - currentThreshold, needed: nextThreshold - currentThreshold, progress };
}

export function simulateDelay(min = 200, max = 600): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      id: slugify(match[2]),
      text: match[2],
      level: match[1].length,
    });
  }
  return headings;
}
