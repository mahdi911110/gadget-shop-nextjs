'use server';

import { getCurrentUser } from "@/lib/auth";
import { addToCart } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

export default async function addtoCartAction(productId: number) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'You must login for adding to cart' }
  }

  const result = addToCart(user.id, productId);
  if (!result) {
    revalidatePath('/','layout');
  }
  return result;
}