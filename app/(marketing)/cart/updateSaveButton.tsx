'use server';

import { getCurrentUser } from "@/lib/auth";
import { handleSetQuantity } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

type State =
| { error: string }
| { success: boolean }
| null;

export default async function updateSaveButton(productId: number, prevState: State, formData: FormData) {
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
  return { success: true };
}