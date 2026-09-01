'use server';

import { signup } from "@/lib/shopdb";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

type PrevState = {
  error?: string
} | {
  passwordError?: string
} | null;

export default async function signupAction(prevState: PrevState | null, formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const address = formData.get('address') as string;
  const country = formData.get('country') as string;
  const city = formData.get('city') as string;
  const birthday = formData.get('birthday') as string;
  const password = formData.get('password') as string;
  
  const confirmPassword = formData.get('confirmPassword') as string;

  if (
    !username ||
    !email ||
    !phoneNumber ||
    !address ||
    !country ||
    !city ||
    !birthday ||
    !password
  ) {
    return { error: 'Fields must not be empty.' };
  }
  
  if (password !== confirmPassword) {
    return { passwordError: 'Passwords not mach.' }
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  
  if (!passwordRegex.test(password)) {
    return {
      passwordError:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
    };
  }

  const phoneRegex = /^09\d{9}$/;

  if (!phoneRegex.test(phoneNumber)) {
    return { phoneError: 'Invalid phone number.' };
  }

  const result = await signup(
    username,
    email,
    phoneNumber,
    address,
    country,
    city,
    birthday,
    password
  );

  if (result?.error) {
    return result;
  }

  const user = await getCurrentUser();

  if (user) {
    redirect('/profile');
  }
  
  redirect('/');
}