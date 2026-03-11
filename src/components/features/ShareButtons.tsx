'use client';

import { Twitter, Linkedin, LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const t = useTranslations('share');
  const shareUrl =
    typeof window !== 'undefined'
      ? new URL(url, window.location.origin).toString()
      : url;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success(t('linkCopied'));
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-1">{t('label')}</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-sky-400 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopyLink}
        className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Copy link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
