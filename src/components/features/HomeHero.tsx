'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Zap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';

interface HomeHeroProps {
  titleLine1: string;
  titleAccent: string;
  subtitle: string;
  ctaStartReading: string;
  ctaJoin: string;
  statsArticles: string;
  statsAuthors: string;
  statsXp: string;
}

export default function HomeHero({
  titleLine1,
  titleAccent,
  subtitle,
  ctaStartReading,
  ctaJoin,
  statsArticles,
  statsAuthors,
  statsXp,
}: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-gray-950 to-gray-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {titleLine1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              {titleAccent}
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/blog">
              <Button variant="primary" size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                {ctaStartReading}
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="gap-2">
                <Zap className="w-5 h-5" />
                {ctaJoin}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16"
        >
          {[
            { label: statsArticles, icon: <BookOpen className="w-4 h-4" /> },
            { label: statsAuthors, icon: <Users className="w-4 h-4" /> },
            { label: statsXp, icon: <Zap className="w-4 h-4" /> },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">{stat.icon}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
