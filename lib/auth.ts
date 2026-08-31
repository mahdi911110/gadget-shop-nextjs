import { cookies } from "next/headers"; 
import { setSession } from "./shopdb";

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