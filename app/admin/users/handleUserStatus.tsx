'use server';

import { handleUserActiveStatus } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

export default async function handleUserStatus(userId: number) {
	handleUserActiveStatus(userId);
	revalidatePath('/admin/users');
}