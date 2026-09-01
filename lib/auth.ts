import { cookies } from "next/headers"; 
import { deleteSessionFromDB, getCurrentUserFromDB, setSession } from "./shopdb";

export async function createSession(userId: number) {
  const sessionId = crypto.randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  await setSession(
    sessionId,
    userId,
    String(expiresAt)
  );

  const cookieStore = await cookies();

  cookieStore.set('session', sessionId,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/'
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get('session')?.value as string;
  
  if (!sessionId) {
    return;
  }

  deleteSessionFromDB(sessionId);

  cookieStore.delete('session');
}

type UserSession = {
  id: number,
  username: string,
  email: string,
  role: string
} | null;

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return null;
  }

  const user = getCurrentUserFromDB(sessionId) as UserSession;

  if (!user) {
    return null;
  }

  return user;
}