'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Zap, BookOpen, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useGamificationStore } from '@/store/gamificationStore';
import Button from '@/components/ui/Button';

const STEP_ICONS = [
  <BookOpen key="discover" className="w-8 h-8 text-sky-500" />,
  <Heart key="engage" className="w-8 h-8 text-pink-400" />,
  <Zap key="xp" className="w-8 h-8 text-amber-400" />,
  <Sparkles key="streak" className="w-8 h-8 text-emerald-400" />,
];

const STEP_KEYS = ['discover', 'engage', 'xp', 'streak'] as const;

export default function OnboardingModal() {
  const t = useTranslations('onboarding');
  const { hasSeenOnboarding, setOnboardingSeen } = useGamificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasSeenOnboarding]);

  const handleClose = () => {
    setIsOpen(false);
    setOnboardingSeen();
  };

  const handleNext = () => {
    if (step < STEP_KEYS.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 text-center">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6 flex justify-center">{STEP_ICONS[step]}</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t(`steps.${STEP_KEYS[step]}.title`)}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{t(`steps.${STEP_KEYS[step]}.description`)}</p>
              </motion.div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {STEP_KEYS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === step ? 'bg-sky-500 w-6' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  {t('skip')}
                </Button>
                <Button variant="primary" size="sm" onClick={handleNext}>
                  {step < STEP_KEYS.length - 1 ? t('next') : t('getStarted')}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
