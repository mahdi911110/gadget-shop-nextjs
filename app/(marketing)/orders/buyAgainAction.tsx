"use server";

import { getCurrentUser } from "@/lib/auth";
import { addToCart } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

type prevState = {
  error: string
} | null;

export default async function buyAgainAction(
    productId: number,
    prevState: prevState,
    formData: FormData,
  ) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Login first" };
  }
  const cart = addToCart(user.id, productId);

  if (!cart) {
    revalidatePath('/orders');
  }

  return cart;
}
