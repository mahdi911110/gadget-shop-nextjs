'use server';

import { handleUserActiveStatus } from "@/lib/shopdb";
import { revalidatePath } from "next/cache";

export default async function handleUserStatus(lang: 'fa' | 'en', userId: number) {
	handleUserActiveStatus(userId);
	revalidatePath(`/${lang}/admin/users`);
}