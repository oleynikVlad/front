import { z } from 'zod';

export const createLoginSchema = (t: (key: string) => string) =>
    z.object({
        username: z
            .string()
            .min(3, t('validation.usernameMin'))
            .max(20, t('validation.usernameMax')),

        password: z
            .string()
            .min(8, t('validation.passwordMin')),
    });

export type LoginForm = z.infer<ReturnType<typeof createLoginSchema>>;