'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLogin } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Link } from '@/i18n/navigation';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('login');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    login.mutate(
      { username, password },
      {
        onSuccess: () => router.push('/'),
      }
    );
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('welcomeBack')}</h1>
            <p className="text-sm text-gray-400">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('username')}
              placeholder={t('usernamePlaceholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <div className="relative">
              <Input
                label={t('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full gap-2 mt-2"
              isLoading={login.isPending}
            >
              <LogIn className="w-4 h-4" />
              {t('signIn')}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
            <p className="text-xs text-gray-400 text-center mb-2">{t('demoCredentials')}</p>
            <div className="flex justify-center gap-6 text-sm">
              <div>
                <span className="text-gray-500">{t('demoUsername')} </span>
                <span className="text-gray-300 font-mono">demo</span>
              </div>
              <div>
                <span className="text-gray-500">{t('demoPassword')} </span>
                <span className="text-gray-300 font-mono">demo123</span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t('noAccount')}{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              {t('signUp')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
