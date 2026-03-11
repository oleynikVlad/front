import { Providers } from '@/lib/providers';
import { ThemeProvider } from '@/lib/ThemeProvider';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('devblog-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased transition-colors duration-200">
        <ThemeProvider>
          <Providers>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
