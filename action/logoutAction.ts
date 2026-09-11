'use server';

import { deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function logoutAction(lang: 'fa' | 'en') {
	await deleteSession();
	redirect(`/${lang}`);
}