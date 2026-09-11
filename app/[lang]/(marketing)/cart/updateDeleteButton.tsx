'use server';

import { getCurrentUser } from "@/lib/auth";
import { deleteCartItems } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

export async function updateDeleteButton(
    lang: 'fa' | 'en',
    productId: number,
    cartId: number
  ) {
  const user = await getCurrentUser();

  if (user) {
    deleteCartItems(user.id, cartId, productId);
  }

  revalidatePath(`/${lang}/cart`);
}