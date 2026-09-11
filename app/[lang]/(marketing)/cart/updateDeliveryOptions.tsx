'use server';

import { getCurrentUser } from "@/lib/auth";
import { updateDeliveryOptionCartItems } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateDeliveryOptions(lang: 'fa' | 'en', deliveryOption: number, productId: number) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect(`/${lang}/login`);
  }

  updateDeliveryOptionCartItems(deliveryOption, user.id, productId);
  revalidatePath(`/${lang}/cart`);
}