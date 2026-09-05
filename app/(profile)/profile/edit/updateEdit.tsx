'use server';

import { getCurrentUser } from "@/lib/auth";
import { editUser } from "@/lib/shopdb";
import { redirect } from "next/navigation";

type prevState = {
  error: string;
  phoneError?: undefined;
} | {
  phoneError: string;
  error?: undefined;
} | null;

export default async function updateEdit(prevState: prevState, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const email = formData.get('email');
  const username = formData.get('username');
  const phoneNumber = formData.get('phoneNumber');
  const address = formData.get('address');
  const country = formData.get('country');
  const city = formData.get('city');
  const birthday = formData.get('birthday');

  if (
    !username ||
    !email ||
    !phoneNumber ||
    !address ||
    !country ||
    !city ||
    !birthday
  ) {
    return { error: 'Fields must not be empty.' };
  }
  
  const phoneRegex = /^09\d{9}$/;

  if (!phoneRegex.test(String(phoneNumber))) {
    return { phoneError: 'Invalid phone number.' };
  }

  
  const result = editUser(
    String(email),
    String(username),
    String(phoneNumber),
    String(address),
    String(country),
    String(city),
    String(birthday),
    user.id
  );

  if (result) {
    return result;
  }

  redirect('/profile');
}