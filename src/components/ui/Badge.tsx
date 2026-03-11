import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300': variant === 'default',
          'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300': variant === 'primary',
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300': variant === 'success',
          'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300': variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
