'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Zap, BookOpen, Sparkles } from 'lucide-react';
import { useGamificationStore } from '@/store/gamificationStore';
import Button from '@/components/ui/Button';

const STEPS = [
  {
    icon: <BookOpen className="w-8 h-8 text-indigo-400" />,
    title: 'Discover Great Content',
    description: 'Browse trending articles, explore categories, and find posts that match your interests. Our platform helps you discover the best developer content.',
  },
  {
    icon: <Heart className="w-8 h-8 text-pink-400" />,
    title: 'Like & Engage',
    description: 'Show appreciation by liking posts and ideas. Your likes help surface the best content for everyone in the community.',
  },
  {
    icon: <Zap className="w-8 h-8 text-amber-400" />,
    title: 'Earn XP & Level Up',
    description: 'Earn experience points by reading posts, liking content, and visiting daily. Level up to unlock new badges and showcase your engagement.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
    title: 'Build Your Streak',
    description: 'Visit daily to maintain your streak and earn bonus XP. Unlock special badges for dedication and consistency.',
  },
];

export default function OnboardingModal() {
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
    if (step < STEPS.length - 1) {
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
            className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors z-10"
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
                <div className="mb-6 flex justify-center">{STEPS[step].icon}</div>
                <h2 className="text-xl font-bold text-white mb-3">{STEPS[step].title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">{STEPS[step].description}</p>
              </motion.div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === step ? 'bg-indigo-500 w-6' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  Skip
                </Button>
                <Button variant="primary" size="sm" onClick={handleNext}>
                  {step < STEPS.length - 1 ? 'Next' : 'Get Started'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
