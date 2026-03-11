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
          'bg-gray-700 text-gray-300': variant === 'default',
          'bg-indigo-900/50 text-indigo-300': variant === 'primary',
          'bg-emerald-900/50 text-emerald-300': variant === 'success',
          'bg-amber-900/50 text-amber-300': variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
