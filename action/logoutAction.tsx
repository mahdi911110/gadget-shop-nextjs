'use server';

import { deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function logoutAction() {
	await deleteSession();
	redirect('/');
}