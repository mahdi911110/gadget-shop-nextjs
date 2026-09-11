"use server";

import { getCurrentUser } from "@/lib/auth";
import { checkout } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type PrevState =
  | { error: string }
  | { notFound: string }
  | null;

export default async function checkoutAction(
    lang: 'fa' | 'en',
    prevState: PrevState,
    formData: FormData
  ) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'You must login first.'};
  }
  
  const result = checkout(user.id);

  if (!result) {
    revalidatePath(`/${lang}/cart`);
    redirect(`/${lang}/orders`);
  }

  return result;
}