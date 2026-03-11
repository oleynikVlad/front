import type { User, Post, TodoIdea, Notification, Category, Author } from '@/types';

const AUTHORS: Author[] = [
  { id: '1', username: 'alexchen', displayName: 'Alex Chen', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex' },
  { id: '2', username: 'sarahdev', displayName: 'Sarah Developer', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah' },
  { id: '3', username: 'mikejohnson', displayName: 'Mike Johnson', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mike' },
  { id: '4', username: 'emilywrites', displayName: 'Emily Writes', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emily' },
  { id: '5', username: 'davecoder', displayName: 'Dave Coder', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Dave' },
  { id: '6', username: 'lisatech', displayName: 'Lisa Tech', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lisa' },
];

export const MOCK_USER: User = {
  id: '1',
  username: 'alexchen',
  displayName: 'Alex Chen',
  email: 'alex@devblog.com',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
  bio: 'Full-stack developer passionate about React, TypeScript, and building great UX.',
  xp: 450,
  level: 3,
  badges: [
    { id: 'first-read', name: 'First Read', description: 'Read your first article', icon: '📖', earnedAt: '2025-12-01T00:00:00Z' },
    { id: '5-articles', name: 'Bookworm', description: 'Read 5 articles', icon: '📚', earnedAt: '2025-12-15T00:00:00Z' },
  ],
  streak: 5,
  lastVisit: new Date().toISOString(),
  createdAt: '2025-11-01T00:00:00Z',
};

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&h=400&fit=crop',
];

const CATEGORIES: Category[] = ['technology', 'design', 'programming', 'devops', 'ai', 'web', 'mobile', 'career', 'tutorial', 'opinion'];

const POST_CONTENTS = [
  `## Introduction

Building modern web applications requires a solid understanding of the latest tools and frameworks. In this article, we'll explore how to create production-grade applications using Next.js, TypeScript, and Tailwind CSS.

### Why Next.js?

Next.js has become the go-to framework for React developers. It offers:

- **Server-Side Rendering (SSR)** for better SEO
- **Static Site Generation (SSG)** for blazing-fast pages
- **API Routes** for backend functionality
- **App Router** for modern routing patterns

### Getting Started

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app
\`\`\`

### Project Structure

A well-organized project structure is crucial for maintainability:

\`\`\`
/src
  /app          # Routes and layouts
  /components   # Reusable components
  /services     # API integration
  /store        # State management
  /types        # TypeScript types
  /utils        # Utility functions
\`\`\`

### TypeScript Integration

TypeScript adds type safety to your React components:

\`\`\`typescript
interface BlogPostProps {
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
}

export function BlogPost({ title, content, author }: BlogPostProps) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  );
}
\`\`\`

### Tailwind CSS

Tailwind CSS provides utility-first styling that scales well:

- Consistent design tokens
- Responsive design built-in
- Dark mode support
- Excellent performance with tree-shaking

### Conclusion

By combining Next.js, TypeScript, and Tailwind CSS, you can build applications that are both performant and maintainable. The key is to establish good patterns early and stick to them throughout your project.`,

  `## The Rise of AI in Software Development

Artificial Intelligence is transforming how we write, test, and deploy software. From code completion to automated testing, AI tools are becoming an integral part of the developer workflow.

### AI-Powered Code Assistants

Modern code assistants can:

1. **Auto-complete code** with high accuracy
2. **Generate boilerplate** from natural language
3. **Detect bugs** before they reach production
4. **Suggest optimizations** for performance

### Machine Learning in Production

Deploying ML models requires careful consideration:

\`\`\`python
# Example: Simple model serving with FastAPI
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictionRequest(BaseModel):
    features: list[float]

@app.post("/predict")
async def predict(request: PredictionRequest):
    prediction = model.predict([request.features])
    return {"prediction": prediction.tolist()}
\`\`\`

### Best Practices

When integrating AI into your workflow:

- **Start small** — begin with code completion
- **Validate outputs** — AI isn't always right
- **Stay updated** — the field moves fast
- **Understand limitations** — know when AI helps and when it doesn't

### The Future

The future of AI in development looks promising. We're moving towards more intelligent systems that can understand context, maintain state, and even architect solutions. However, the role of the developer remains crucial — AI is a tool, not a replacement.

### Conclusion

Embracing AI tools can significantly boost your productivity, but it's important to use them wisely. The best developers will be those who can effectively collaborate with AI while maintaining their core engineering skills.`,

  `## Mastering React Server Components

React Server Components (RSC) represent a fundamental shift in how we think about building React applications. They allow components to run exclusively on the server, reducing bundle size and improving performance.

### What Are Server Components?

Server Components are React components that:

- Run only on the server
- Have zero impact on client bundle size
- Can directly access databases and file systems
- Cannot use state or effects

### Client vs Server Components

\`\`\`tsx
// Server Component (default in Next.js App Router)
async function BlogList() {
  const posts = await db.posts.findMany();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// Client Component
'use client';
import { useState } from 'react';

function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}
\`\`\`

### Benefits

1. **Smaller bundle sizes** — server code stays on the server
2. **Better performance** — less JavaScript to parse
3. **Direct backend access** — no API layer needed
4. **Streaming** — progressive rendering

### When to Use Each

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| Fetch data | ✅ | ⚠️ Use hooks |
| Access backend | ✅ | ❌ |
| Use state | ❌ | ✅ |
| Use effects | ❌ | ✅ |
| Event handlers | ❌ | ✅ |

### Conclusion

React Server Components are a game-changer for performance. By understanding when to use server vs client components, you can build faster, more efficient applications.`,
];

function generatePosts(): Post[] {
  const titles = [
    'Building Modern Web Apps with Next.js and TypeScript',
    'The Rise of AI in Software Development',
    'Mastering React Server Components',
    'A Complete Guide to Tailwind CSS v4',
    'DevOps Best Practices for 2026',
    'Understanding WebAssembly: The Future of Web Performance',
    'Building Accessible Design Systems',
    'Microservices vs Monolith: A Practical Guide',
    'The Art of Code Review',
    'GraphQL vs REST: Choosing the Right API Architecture',
    'Introduction to Edge Computing',
    'Rust for JavaScript Developers',
    'Building Real-time Applications with WebSockets',
    'The State of CSS in 2026',
    'Kubernetes for Beginners: A Hands-on Tutorial',
    'TypeScript 6.0: What\'s New and Exciting',
    'Mobile Development with React Native',
    'Securing Your API: Best Practices',
    'The Psychology of Developer Experience',
    'Building a Design System from Scratch',
    'Performance Optimization Techniques for React',
    'CI/CD Pipelines: A Complete Guide',
    'Understanding Docker Containers',
    'The Future of Frontend Frameworks',
  ];

  const previews = [
    'Learn how to build production-grade applications with the latest web technologies and best practices.',
    'Explore how artificial intelligence is transforming the software development landscape and what it means for developers.',
    'Deep dive into React Server Components and learn how to leverage them for better performance.',
    'Everything you need to know about the latest version of Tailwind CSS and its game-changing features.',
    'Essential DevOps practices that every modern development team should adopt in 2026.',
    'Discover how WebAssembly is revolutionizing web performance and what it means for the future.',
    'Learn the principles of building accessible design systems that work for everyone.',
    'A practical comparison to help you choose the right architecture for your next project.',
    'Master the art of giving and receiving code reviews that improve code quality and team dynamics.',
    'An in-depth comparison of GraphQL and REST to help you make the right choice for your API.',
    'Get started with edge computing and understand its implications for modern applications.',
    'A gentle introduction to Rust for developers coming from the JavaScript ecosystem.',
    'Build real-time features with WebSockets and learn about different implementation strategies.',
    'An overview of the latest CSS features and how they\'re changing the way we style the web.',
    'A step-by-step tutorial to get you started with Kubernetes and container orchestration.',
    'Discover the exciting new features in TypeScript 6.0 and how to use them in your projects.',
    'Build cross-platform mobile applications with React Native and share code with your web app.',
    'Essential security practices to protect your API from common vulnerabilities and attacks.',
    'Understanding the psychological aspects of creating great developer experiences.',
    'A comprehensive guide to building and maintaining a scalable design system.',
    'Practical techniques to improve React application performance and user experience.',
    'Set up efficient CI/CD pipelines that automate your testing and deployment workflow.',
    'A comprehensive introduction to Docker containers and containerization concepts.',
    'Explore emerging frontend frameworks and predict the future of web development.',
  ];

  const tags = [
    ['nextjs', 'typescript', 'react', 'tailwind'],
    ['ai', 'machine-learning', 'automation', 'productivity'],
    ['react', 'server-components', 'performance', 'nextjs'],
    ['css', 'tailwind', 'design', 'frontend'],
    ['devops', 'ci-cd', 'automation', 'cloud'],
    ['webassembly', 'performance', 'wasm', 'web'],
    ['accessibility', 'design-system', 'ux', 'components'],
    ['architecture', 'microservices', 'backend', 'scalability'],
    ['code-review', 'teamwork', 'best-practices', 'quality'],
    ['graphql', 'rest', 'api', 'architecture'],
    ['edge-computing', 'cloud', 'performance', 'serverless'],
    ['rust', 'systems', 'performance', 'javascript'],
    ['websockets', 'real-time', 'backend', 'communication'],
    ['css', 'styling', 'web', 'frontend'],
    ['kubernetes', 'containers', 'devops', 'tutorial'],
    ['typescript', 'javascript', 'programming', 'tools'],
    ['react-native', 'mobile', 'cross-platform', 'react'],
    ['security', 'api', 'authentication', 'backend'],
    ['dx', 'ux', 'psychology', 'developer-tools'],
    ['design-system', 'components', 'ui', 'frontend'],
    ['react', 'performance', 'optimization', 'frontend'],
    ['ci-cd', 'devops', 'automation', 'testing'],
    ['docker', 'containers', 'devops', 'infrastructure'],
    ['frontend', 'frameworks', 'web', 'trends'],
  ];

  return titles.map((title, i) => ({
    id: `post-${i + 1}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title,
    preview: previews[i],
    content: POST_CONTENTS[i % POST_CONTENTS.length],
    coverImage: COVER_IMAGES[i % COVER_IMAGES.length],
    author: AUTHORS[i % AUTHORS.length],
    category: CATEGORIES[i % CATEGORIES.length] as Category,
    tags: tags[i],
    readingTime: Math.floor(Math.random() * 12) + 3,
    likes: Math.floor(Math.random() * 500) + 10,
    views: Math.floor(Math.random() * 5000) + 100,
    liked: Math.random() > 0.7,
    publishedAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 120) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

function generateTodoIdeas(): TodoIdea[] {
  const ideas = [
    { title: 'Add dark mode toggle', description: 'Implement a system-wide dark mode toggle that respects user preferences and persists across sessions.' },
    { title: 'Implement comment system', description: 'Build a threaded comment system with markdown support, mentions, and real-time updates.' },
    { title: 'Add code playground', description: 'Create an embedded code playground where users can run and share code snippets directly in blog posts.' },
    { title: 'Newsletter subscription', description: 'Add email newsletter functionality with weekly digest of popular articles and personalized recommendations.' },
    { title: 'Reading lists', description: 'Allow users to save articles to custom reading lists and share them with others.' },
    { title: 'Author dashboard', description: 'Build a comprehensive dashboard for authors with analytics, engagement metrics, and content management.' },
    { title: 'RSS feed support', description: 'Generate RSS feeds for the blog, individual authors, and categories for feed reader compatibility.' },
    { title: 'Social sharing previews', description: 'Implement rich social media previews with custom OG images generated from post content.' },
    { title: 'Collaborative editing', description: 'Allow multiple authors to collaborate on a single post with real-time editing and conflict resolution.' },
    { title: 'AI-powered summaries', description: 'Use AI to generate concise summaries of long articles, helping readers decide what to read.' },
    { title: 'Post series support', description: 'Enable authors to group related posts into series with navigation between parts.' },
    { title: 'Offline reading', description: 'Implement service worker-based offline reading so users can access saved articles without internet.' },
    { title: 'Accessibility audit', description: 'Conduct a thorough accessibility audit and fix all WCAG 2.1 AA violations across the platform.' },
    { title: 'Mobile app', description: 'Build a companion mobile app with push notifications and offline reading support.' },
    { title: 'Analytics dashboard', description: 'Create a public-facing analytics dashboard showing platform growth and content trends.' },
    { title: 'Internationalization', description: 'Add multi-language support for the platform UI and content translation workflows.' },
  ];

  return ideas.map((idea, i) => ({
    id: `idea-${i + 1}`,
    title: idea.title,
    description: idea.description,
    author: AUTHORS[i % AUTHORS.length],
    likes: Math.floor(Math.random() * 200) + 5,
    liked: Math.random() > 0.6,
    category: CATEGORIES[i % CATEGORIES.length] as Category,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

function generateNotifications(): Notification[] {
  return [
    { id: 'n1', type: 'xp', title: 'XP Earned!', message: 'You earned 10 XP for reading an article', read: false, createdAt: new Date().toISOString() },
    { id: 'n2', type: 'badge', title: 'New Badge!', message: 'You earned the "Bookworm" badge', read: false, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'n3', type: 'streak', title: 'Streak!', message: 'You\'re on a 5-day streak! Keep it up!', read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'n4', type: 'system', title: 'Welcome!', message: 'Welcome to DevBlog! Start by reading some articles.', read: true, createdAt: new Date(Date.now() - 604800000).toISOString() },
  ];
}

export const mockPosts = generatePosts();
export const mockTodoIdeas = generateTodoIdeas();
export const mockNotifications = generateNotifications();
export const mockAuthors = AUTHORS;
