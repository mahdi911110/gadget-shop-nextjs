'use server';

import { getCurrentUser } from "@/lib/auth";
import { handleSetQuantity } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

export default async function updateSaveButton(productId: number, prevState: null, formData: FormData) {
  const quantityValue = formData.get('quantity');

  const user = await getCurrentUser();

  if (!user) {
    return { error: 'You must login first.' };
  }

  const quantity = Number(quantityValue);

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: 'Quantity must be at least 1.' };
  }

  handleSetQuantity(user.id, productId, quantity);

  revalidatePath('/cart');
}