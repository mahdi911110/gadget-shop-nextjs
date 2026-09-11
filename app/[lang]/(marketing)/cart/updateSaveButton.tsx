'use server';

import { getCurrentUser } from "@/lib/auth";
import { getStock, handleSetQuantity } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

type State =
| { error: string }
| { success: boolean }
| null;

export default async function updateSaveButton(lang: 'fa' | 'en', productId: number, prevState: State, formData: FormData) {
  const quantityValue = formData.get('quantity');

  const user = await getCurrentUser();

  if (!user) {
    return { error: 'You must login first.' };
  }

  const quantity = Number(quantityValue);

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: 'Quantity must be at least 1.' };
  }

  const stock = getStock(productId);

  if (stock === undefined) {
    return { error: 'Could not find the product.' };
  }

  if (stock < quantity) {
    return { error: 'Not enough products in stock.' };
  }

  handleSetQuantity(user.id, productId, quantity);

  revalidatePath(`/${lang}/cart`);
  return { success: true };
}