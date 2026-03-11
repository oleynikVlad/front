'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  Bell,
  LogIn,
  LogOut,
  User,
  PenSquare,
  Lightbulb,
  Zap,
  ChevronDown,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { useUIStore } from '@/store/uiStore';
import { useLogout } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';
import { getXpForNextLevel } from '@/utils/helpers';
import { XP_LEVELS } from '@/config';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/', labelKey: 'home' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/search', labelKey: 'search' },
  { href: '/todo', labelKey: 'ideas' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('nav');
  const { isAuthenticated, user } = useAuthStore();
  const { xp, level, streak } = useGamificationStore();
  const { notifications, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, markNotificationRead } = useUIStore();
  const logout = useLogout();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const xpProgress = getXpForNextLevel(xp);
  const levelTitle = XP_LEVELS.find((l) => l.level === level)?.title || 'Newcomer';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-white">DevBlog</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-white bg-gray-800'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Locale switch */}
            <div className="hidden sm:flex items-center bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => router.replace(pathname, { locale: 'en' })}
                className={cn(
                  'px-2.5 py-1.5 text-xs font-semibold transition-colors',
                  locale === 'en' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => router.replace(pathname, { locale: 'uk' })}
                className={cn(
                  'px-2.5 py-1.5 text-xs font-semibold transition-colors',
                  locale === 'uk' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                UK
              </button>
            </div>

            {/* Search */}
            <Link href="/search" className="hidden sm:flex p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50">
              <Search className="w-5 h-5" />
            </Link>

            {isAuthenticated ? (
              <>
                {/* XP Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/50 border border-indigo-800/30 rounded-full">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-300">{xp} XP</span>
                  <span className="text-xs text-indigo-500">Lv.{level}</span>
                </div>

                {/* Streak */}
                {streak > 0 && (
                  <div className="hidden lg:flex items-center gap-1 px-2 py-1 text-xs text-amber-400">
                    <span>🔥</span>
                    <span>{streak}d</span>
                  </div>
                )}

                {/* Create Post */}
                <Link href="/blog/new">
                  <Button variant="primary" size="sm" className="hidden sm:inline-flex gap-1.5">
                    <PenSquare className="w-4 h-4" />
                    {t('write')}
                  </Button>
                </Link>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-800">
                          <h3 className="text-sm font-semibold text-white">{t('notifications')}</h3>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <p className="px-4 py-8 text-center text-sm text-gray-500">{t('noNotifications')}</p>
                          ) : (
                            notifications.map((n) => (
                              <button
                                key={n.id}
                                onClick={() => markNotificationRead(n.id)}
                                className={cn(
                                  'w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors border-b border-gray-800/50 last:border-0',
                                  !n.read && 'bg-indigo-950/20'
                                )}
                              >
                                <p className="text-sm font-medium text-gray-200">{n.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                              </button>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {user?.displayName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                  </button>

                  <AnimatePresence>
                    {showProfile && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-800">
                          <p className="text-sm font-semibold text-white">{user?.displayName}</p>
                          <p className="text-xs text-gray-500">@{user?.username}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-indigo-400">{levelTitle} (Lv.{level})</span>
                              <span className="text-gray-500">{Math.round(xpProgress.progress)}%</span>
                            </div>
                            <div className="mt-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${xpProgress.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setShowProfile(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            {t('profile')}
                          </Link>
                          <Link
                            href="/blog/new"
                            onClick={() => setShowProfile(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                          >
                            <PenSquare className="w-4 h-4" />
                            {t('writePost')}
                          </Link>
                          <Link
                            href="/todo"
                            onClick={() => setShowProfile(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                          >
                            <Lightbulb className="w-4 h-4" />
                            {t('ideas')}
                          </Link>
                          <button
                            onClick={() => {
                              logout.mutate();
                              setShowProfile(false);
                            }}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-gray-800/50 transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            {t('logOut')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm" className="gap-1.5">
                  <LogIn className="w-4 h-4" />
                  {t('signIn')}
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-800"
            >
              <div className="py-3 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'text-white bg-gray-800'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    )}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    href="/blog/new"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-400 hover:bg-gray-800/50 transition-colors"
                  >
                    {t('writePost')}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
