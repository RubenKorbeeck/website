import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // Clear the session cookie by setting it to an empty value with an immediate expiry
  response.cookies.set('session', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });

  return response;
}