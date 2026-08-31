'use server';

import { createSession } from "@/lib/auth";
import { login } from "@/lib/shopdb"
import { redirect } from "next/navigation";

export default async function loginAction(prevState: string | null, formData: FormData) {
  const emailOrUsername = String(formData.get('email'));
  const password = String(formData.get('password'));
  
  const result = await login(emailOrUsername, password);

  if (result.error) {
    return result.error;
  }

  const user = result.user;

  if (!user) {
    return 'Login failed';
  }

  await createSession(user.id);

  if (user.role === 'admin') {
    redirect('/admin');
  }

  redirect('/');
}