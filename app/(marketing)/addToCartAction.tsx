'use server';

import { getCurrentUser } from "@/lib/auth";
import { addToCart } from "@/lib/shopdb";

export default async function addtoCartAction(productId: number) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'You must login for adding to cart' }
  }

  return addToCart(user.id, productId);
}