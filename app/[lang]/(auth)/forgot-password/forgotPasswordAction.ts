'use server';

import { verifyingEmail } from '@/lib/shopdb';
import * as z from 'zod';
import { Resend } from 'resend';

type PrevState = {
  error: string;
} | {
  success: boolean;
} | null;

const userEmail = z.object({
  email: z.email()
});

export async function forgotPasswordAction(lang : 'fa' | 'en', prevState: PrevState, formData: FormData) {
  const emailBox = {
    email: formData.get('email')
  }

  const result = userEmail.safeParse(emailBox);

  if (result.error) {
    return { error: 'Invalid email' };
  }

  const { email } = result.data;

  const token = verifyingEmail(email);

  if (!token) {
    return { error: 'This email does not exist.' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: lang === 'fa' ? 'تغییر رمزعبور' : 'Password reset',
    html: lang === 'fa' ?
      `
      <p>
        این ایمیل برای تغییر رمزعبور ارسال شده است.
      </p>
      <p>
        برای تغییر رمزعبور روی لینک زیر کلیک کنید:
      </p>
      <a href="http://localhost:3000/${lang}/reset-password?token=${token}">
        برای تغییر رمزعبور کلیک کنید
      </a>
    `
    :
    `
      <p>
        This email was sent to reset your password.
      </p>
      <p>
        Please click the link below to reset your password:
      </p>
      <a href="http://localhost:3000/${lang}/reset-password?token=${token}">
        Click to change password
      </a>
    `
  });

  if (error) {
    return { error: 'Failed to send email.' };
  }

  return { success: true };
}