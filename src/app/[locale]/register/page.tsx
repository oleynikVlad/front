'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {useRegister} from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Link } from '@/i18n/navigation';

import { createRegisterSchema, RegisterForm } from '@/validators/register';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RegisterPage() {
    const t = useTranslations();
    const router = useRouter();
    const registerUser = useRegister();

    const [showPassword, setShowPassword] = useState(false);

    const schema = createRegisterSchema(t);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: RegisterForm) => {
        registerUser.mutate(data, {
            onSuccess: () => router.push('/'),
        });
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

                        <h1 className="text-2xl font-bold text-white mb-2">
                            {t('register.welcomeBack')}
                        </h1>

                        <p className="text-sm text-gray-400">
                            {t('register.subtitle')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div>
                            <Input
                                label={t('register.username')}
                                placeholder={t('register.usernamePlaceholder')}
                                autoComplete="username"
                                {...register('username')}
                            />

                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <Input
                                label={t('register.password')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('register.passwordPlaceholder')}
                                autoComplete="current-password"
                                {...register('password')}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full gap-2 mt-2"
                            isLoading={registerUser.isPending}
                        >
                            <LogIn className="w-4 h-4" />
                            {t('register.signUp')}
                        </Button>

                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        {t('register.haveAccount')}{' '}
                        <Link
                            href="/login"
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            {t('register.signIn')}
                        </Link>
                    </p>

                </div>
            </motion.div>
        </div>
    );
}