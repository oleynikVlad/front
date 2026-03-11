'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, PenSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCreatePost } from '@/hooks/usePosts';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import MarkdownRenderer from '@/components/features/MarkdownRenderer';
import { CATEGORIES } from '@/types';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const createPost = useCreatePost();

  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('technology');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <PenSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-3">Sign in to Write</h1>
        <p className="text-gray-400 mb-6">You need to be logged in to create a post.</p>
        <Link href="/login">
          <Button variant="primary">Sign In</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!title || !content) return;
    const post = await createPost.mutateAsync({
      title,
      preview: preview || content.slice(0, 200),
      content,
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    });
    router.push(`/blog/${post.slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Write a Post</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-1.5"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Editor' : 'Preview'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={createPost.isPending}
            disabled={!title || !content}
            className="gap-1.5"
          >
            <Send className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Editor Meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          label="Title"
          placeholder="Your article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Preview Text"
          placeholder="Brief description..."
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
        />
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={CATEGORIES}
        />
        <Input
          label="Tags (comma-separated)"
          placeholder="react, typescript, nextjs"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Input
          label="Cover Image URL"
          placeholder="https://..."
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="md:col-span-2"
        />
      </div>

      {/* Editor / Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <motion.div
          initial={false}
          animate={{ width: showPreview ? '100%' : '100%' }}
          className={showPreview ? 'hidden lg:block' : 'lg:col-span-2'}
        >
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-800 flex items-center gap-2">
              <PenSquare className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">Markdown Editor</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in Markdown...

## Getting Started

Write your content here. You can use **bold**, *italic*, `code`, and more.

### Code blocks

```javascript
const hello = 'world';
```

### Lists

- Item 1
- Item 2
- Item 3"
              className="w-full h-[500px] bg-transparent text-gray-100 px-4 py-4 resize-none focus:outline-none font-mono text-sm placeholder-gray-600"
            />
          </div>
        </motion.div>

        {/* Preview */}
        {(showPreview || true) && (
          <div className={`${showPreview ? 'lg:col-span-2' : ''}`}>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">Preview</span>
              </div>
              <div className="p-6 min-h-[500px]">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-gray-600 text-sm">Start writing to see a preview...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
