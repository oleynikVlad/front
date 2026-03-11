'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/cn';
import { extractHeadings } from '@/utils/helpers';

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const t = useTranslations();
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        <List className="w-4 h-4" />
        {t('tableOfContents')}
      </h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={cn(
              'block w-full text-left text-sm py-1 transition-colors duration-200 hover:text-sky-600 dark:hover:text-sky-400',
              heading.level === 2 && 'pl-0',
              heading.level === 3 && 'pl-4',
              activeId === heading.id ? 'text-sky-600 dark:text-sky-400 font-medium' : 'text-gray-500'
            )}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
