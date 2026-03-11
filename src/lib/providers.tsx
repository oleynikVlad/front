'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          className: 'dark:!bg-gray-900 dark:!text-gray-200 !bg-white !text-gray-800 !rounded-xl !border !border-gray-200 dark:!border-gray-800',
          style: {
            borderRadius: '12px',
          },
        }}
      />
    </QueryClientProvider>
  );
}
