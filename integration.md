# Backend Integration Documentation

This document describes all required backend API endpoints for the DevBlog platform. The backend should be implemented using NestJS and provide a RESTful API.

## Base URL

```
/api
```

## Authentication

All authenticated endpoints require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

---

## Auth Endpoints

### POST /auth/login

Authenticate a user and return JWT tokens.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "string",
    "username": "string",
    "displayName": "string",
    "email": "string",
    "avatar": "string",
    "bio": "string",
    "xp": 0,
    "level": 1,
    "badges": [],
    "streak": 0,
    "lastVisit": "ISO 8601 date string",
    "createdAt": "ISO 8601 date string"
  },
  "tokens": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

**Errors:**

- `401` Invalid credentials

---

### POST /auth/logout

Invalidate the current session.

**Headers:** Requires authentication.

**Response (200):**

```json
{ "message": "Logged out successfully" }
```

---

### GET /auth/profile

Get the authenticated user's profile.

**Headers:** Requires authentication.

**Response (200):**

```json
{
  "id": "string",
  "username": "string",
  "displayName": "string",
  "email": "string",
  "avatar": "string",
  "bio": "string",
  "xp": 0,
  "level": 1,
  "badges": [],
  "streak": 0,
  "lastVisit": "ISO 8601 date string",
  "createdAt": "ISO 8601 date string"
}
```

---

## Posts Endpoints

### GET /posts

Get paginated list of posts.

**Query Parameters:**

| Parameter | Type   | Default  | Description                          |
|-----------|--------|----------|--------------------------------------|
| page      | number | 1        | Page number                          |
| limit     | number | 12       | Items per page                       |
| sort      | string | "recent" | Sort: "recent", "popular", "liked"   |
| category  | string | —        | Filter by category                   |
| query     | string | —        | Search query                         |

**Response (200):**

```json
{
  "data": [
    {
      "id": "string",
      "slug": "string",
      "title": "string",
      "preview": "string",
      "content": "string",
      "coverImage": "string",
      "author": {
        "id": "string",
        "username": "string",
        "displayName": "string",
        "avatar": "string"
      },
      "category": "string",
      "tags": ["string"],
      "readingTime": 5,
      "likes": 42,
      "views": 1200,
      "liked": false,
      "publishedAt": "ISO 8601 date string",
      "createdAt": "ISO 8601 date string",
      "updatedAt": "ISO 8601 date string"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 12,
  "totalPages": 9
}
```

---

### GET /posts/trending

Get trending posts (sorted by views).

**Response (200):** Array of Post objects (max 6).

---

### GET /posts/latest

Get latest posts (sorted by publishedAt desc).

**Response (200):** Array of Post objects (max 6).

---

### GET /posts/recommended

Get recommended posts for the authenticated user.

**Response (200):** Array of Post objects (max 6).

---

### GET /posts/:slug

Get a single post by its slug.

**Response (200):** Single Post object.

**Errors:**

- `404` Post not found

---

### GET /posts/:id/related

Get related posts for a given post.

**Response (200):** Array of Post objects (max 3).

---

### POST /posts

Create a new post.

**Headers:** Requires authentication.

**Request Body:**

```json
{
  "title": "string",
  "preview": "string",
  "content": "string (markdown)",
  "coverImage": "string (URL)",
  "category": "string",
  "tags": ["string"]
}
```

**Response (201):** Created Post object.

**Errors:**

- `401` Unauthorized
- `400` Validation error

---

### POST /posts/:id/like

Toggle like on a post.

**Headers:** Requires authentication.

**Response (200):**

```json
{
  "likes": 43,
  "liked": true
}
```

---

### POST /posts/:id/view

Record a view on a post.

**Response (200):**

```json
{
  "views": 1201
}
```

---

## Search Endpoints

### GET /search

Search posts with filters.

**Query Parameters:**

| Parameter      | Type   | Default  | Description                          |
|----------------|--------|----------|--------------------------------------|
| query          | string | —        | Search text                          |
| page           | number | 1        | Page number                          |
| limit          | number | 12       | Items per page                       |
| sort           | string | "recent" | Sort: "recent", "popular", "liked"   |
| category       | string | —        | Filter by category                   |
| readingTimeMin | number | —        | Min reading time in minutes          |
| readingTimeMax | number | —        | Max reading time in minutes          |
| minLikes       | number | —        | Minimum number of likes              |
| author         | string | —        | Filter by author username            |
| dateFrom       | string | —        | ISO date, posts published after      |
| dateTo         | string | —        | ISO date, posts published before     |

**Response (200):** Same paginated format as GET /posts.

---

## Todo Ideas Endpoints

### GET /todo

Get paginated list of ideas.

**Query Parameters:**

| Parameter | Type   | Default  | Description                          |
|-----------|--------|----------|--------------------------------------|
| page      | number | 1        | Page number                          |
| limit     | number | 12       | Items per page                       |
| sort      | string | "liked"  | Sort: "recent", "liked"              |
| category  | string | —        | Filter by category                   |

**Response (200):**

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "author": {
        "id": "string",
        "username": "string",
        "displayName": "string",
        "avatar": "string"
      },
      "likes": 42,
      "liked": false,
      "category": "string",
      "createdAt": "ISO 8601 date string"
    }
  ],
  "total": 16,
  "page": 1,
  "limit": 12,
  "totalPages": 2
}
```

---

### POST /todo/:id/like

Toggle like on an idea.

**Headers:** Requires authentication.

**Response (200):**

```json
{
  "likes": 43,
  "liked": true
}
```

---

## Likes Endpoints

### GET /likes

Get posts liked by the authenticated user.

**Headers:** Requires authentication.

**Query Parameters:**

| Parameter | Type   | Default | Description    |
|-----------|--------|---------|----------------|
| page      | number | 1       | Page number    |
| limit     | number | 12      | Items per page |

**Response (200):** Same paginated format as GET /posts.

---

## Data Models

### User

```typescript
interface User {
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
  lastVisit: string; // ISO 8601
  createdAt: string; // ISO 8601
}
```

### Badge

```typescript
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string; // ISO 8601
}
```

### Post

```typescript
interface Post {
  id: string;
  slug: string;
  title: string;
  preview: string;
  content: string; // Markdown
  coverImage: string; // URL
  author: Author;
  category: Category;
  tags: string[];
  readingTime: number; // minutes
  likes: number;
  views: number;
  liked: boolean; // current user's like status
  publishedAt: string; // ISO 8601
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### TodoIdea

```typescript
interface TodoIdea {
  id: string;
  title: string;
  description: string;
  author: Author;
  likes: number;
  liked: boolean;
  category: Category;
  createdAt: string; // ISO 8601
}
```

### Category

```typescript
type Category =
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
```

---

## Environment Variables

The frontend uses the following environment variables:

```
NEXT_PUBLIC_API_MODE=mock | real
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

When `NEXT_PUBLIC_API_MODE=real`, the frontend will make real HTTP requests to the URL specified by `NEXT_PUBLIC_API_URL`. When set to `mock`, the frontend uses built-in mock services with simulated latency.

---

## CORS Configuration

The backend must allow CORS from the frontend origin (default `http://localhost:3000`).

## JWT Configuration

- Access tokens should expire in 15 minutes
- Refresh tokens should expire in 7 days
- Tokens should be signed with a secure secret
