'use server';

import { createSession } from "@/lib/auth";
import { login } from "@/lib/shopdb";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { formatZodErrors } from '@/lib/zodHelpers';

type PrevState = {
  errors?: Record<string, string>;
  error?: string;
} | null;

const createLoginSchema = (lang: 'fa' | 'en') =>
  z.object({
    emailOrUsername: z
      .string()
      .min(1, lang === 'fa' ? 'ایمیل یا نام کاربری الزامی است.' : 'Email or username is required.'),
    password: z
      .string()
      .min(1, lang === 'fa' ? 'رمزعبور الزامی است.' : 'Password is required.'),
  });

export default async function loginAction(
  lang: 'fa' | 'en',
  prevState: PrevState,
  formData: FormData,
) {
  const userConfirm = {
    emailOrUsername: formData.get('emailOrUsername')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
  };

  const parseResult = createLoginSchema(lang).safeParse(userConfirm);

  if (!parseResult.success) {
    return { errors: formatZodErrors(parseResult.error) };
  }

  const data = parseResult.data;

  try {
    const result = await login(data.emailOrUsername, data.password);

    if (!result.user) {
      return {
        error: lang === 'fa'
          ? 'ایمیل/نام کاربری یا رمزعبور اشتباه است.'
          : 'Invalid email/username or password.',
      };
    }

    const user = result.user;

    await createSession(user.id);

    if (user.role === 'admin') {
      redirect(`/${lang}/admin`);
    }

    redirect(`/${lang}`);
  } catch (err) {
    console.error('Login error:', err);
    return {
      error: lang === 'fa'
        ? 'خطایی رخ داد. لطفاً دوباره تلاش کنید.'
        : 'Something went wrong. Please try again.',
    };
  }
}