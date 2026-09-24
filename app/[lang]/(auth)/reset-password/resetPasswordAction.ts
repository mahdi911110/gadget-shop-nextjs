'use server';

import { resetPasswordDB } from '@/lib/shopdb';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

type PrevState = {
  error: string;
} | null;

export async function resetPasswordAction(lang: 'fa' | 'en', token: string, prevState: PrevState, formData: FormData) {
  const passwordReset = z.object({
    password: z.string()
      .min(8, lang === 'fa' ? 'رمزعبور باید حداقل ۸ کاراکتر باشد.' : 'Password must be at least 8 characters.'),
    confirmPassword: z.string()
      .min(8, lang === 'fa' ? 'رمزعبور باید حداقل ۸ کاراکتر باشد.' : 'Password must be at least 8 characters.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: lang === "fa" ? "رمزها یکسان نیستند" : "Passwords do not match",
  });
  const passwordBox = {
    password: formData.get('newPassword'),
    confirmPassword: formData.get('newPasswordAgain')
  }
  const result = passwordReset.safeParse(passwordBox);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
  const data = result.data;
  const passwordHash = await bcrypt.hash(data.password, 12);
  const resetPasswordResult = resetPasswordDB(token, passwordHash);
  if (resetPasswordResult.error) {
    return { error: resetPasswordResult.error };
  }
  redirect(`/${lang}/login`);
}