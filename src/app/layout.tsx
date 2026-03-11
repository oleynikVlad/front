import { Providers } from '@/lib/providers';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-gray-950 text-gray-100 antialiased">
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
