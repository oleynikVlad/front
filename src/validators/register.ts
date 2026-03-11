import { z } from 'zod';

export const createRegisterSchema = (t: (key: string) => string) =>
    z.object({
        username: z
            .string()
            .min(3, t('validation.usernameMin'))
            .max(20, t('validation.usernameMax')),

        password: z
            .string()
            .min(8, t('validation.passwordMin')),
    });

export type RegisterForm = z.infer<ReturnType<typeof createRegisterSchema>>;