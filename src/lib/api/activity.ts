/**
 * Activity API
 *
 * Activity tracking (XP, gamification events) is handled by the backend.
 * The frontend only displays values returned by the API.
 *
 * Required backend endpoints are documented in integration.md:
 * - POST /activity — Record a user activity (read_post, like_post, like_idea, daily_visit)
 * - GET /user/profile — Returns xp, level, points, streak, badges
 * - GET /leaderboard — Returns ranked users by XP
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function recordActivity(
  type: string,
  entityId: string,
  accessToken: string
): Promise<{ xp: number; totalXp: number; level: number }> {
  const res = await fetch(`${API_URL}/activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ type, entityId }),
  });

  if (!res.ok) {
    throw new Error('Failed to record activity');
  }

  return res.json();
}

export async function getLeaderboard(): Promise<
  { id: string; username: string; displayName: string; avatar: string; xp: number; level: number }[]
> {
  const res = await fetch(`${API_URL}/leaderboard`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch leaderboard');
  }

  return res.json();
}
