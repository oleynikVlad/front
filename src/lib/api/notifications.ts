import type { Notification } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getNotifications(accessToken: string): Promise<Notification[]> {
  const res = await fetch(`${API_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return res.json();
}

export async function markNotificationRead(
  notificationId: string,
  accessToken: string
): Promise<{ id: string; read: boolean }> {
  const res = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to mark notification as read');
  }

  return res.json();
}
