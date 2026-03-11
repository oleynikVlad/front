'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, label, options, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>}
      <select
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 transition-colors duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent',
          'appearance-none cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
