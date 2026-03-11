'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { slugify } from '@/utils/helpers';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            return <h1 id={slugify(text)} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4" {...props}>{children}</h1>;
          },
          h2: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            return <h2 id={slugify(text)} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3 pb-2 border-b border-gray-200 dark:border-gray-800" {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            return <h3 id={slugify(text)} className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-2" {...props}>{children}</h3>;
          },
          p: ({ children, ...props }) => (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4" {...props}>{children}</p>
          ),
          a: ({ children, href, ...props }) => (
            <a href={href} className="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 underline decoration-sky-400/30 hover:decoration-sky-300/50 transition-colors" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-gray-300 mb-4 ml-2" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-1.5 text-gray-600 dark:text-gray-300 mb-4 ml-2" {...props}>{children}</ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-gray-600 dark:text-gray-300" {...props}>{children}</li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-sky-500 pl-4 py-1 italic text-gray-500 dark:text-gray-400 my-4" {...props}>{children}</blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <div className="relative my-4">
                  <pre className="bg-gray-100 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 rounded-xl p-4 overflow-x-auto">
                    <code className={`text-sm text-gray-700 dark:text-gray-300 ${className}`} {...props}>{children}</code>
                  </pre>
                </div>
              );
            }
            return (
              <code className="bg-gray-100 text-sky-700 dark:bg-gray-800 dark:text-sky-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" {...props}>{children}</table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-50 dark:bg-gray-800/50" {...props}>{children}</thead>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300" {...props}>{children}</th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/50" {...props}>{children}</td>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>{children}</strong>
          ),
          hr: () => <hr className="border-gray-200 dark:border-gray-800 my-8" />,
          img: ({ src, alt, ...props }) => (
            <span className="block my-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt || ''} className="rounded-xl max-w-full h-auto" {...props} />
            </span>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
