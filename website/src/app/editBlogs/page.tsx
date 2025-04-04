import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ProtectedPage() {
  const sessionCookie = cookies().get('session');

  if (!sessionCookie || sessionCookie.value !== 'valid') {
    // ❌ Not logged in → redirect to login
    redirect('/login');
  }

  // ✅ Logged in → show content
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome, julian</h1>
      <p>This page is protected and only visible to logged-in users.</p>

      <form method="POST" action="/api/logout">
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
