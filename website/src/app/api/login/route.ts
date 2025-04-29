// /app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const mockUser = {
  username: 'julian',
  // hash for "test1234"
  passwordHash: '$2b$10$BOdI3zRM0Ul7k9hxxa7HfeRPBZ4D0T60Tf6Td.Z2eEQs87RW3fMgG',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Debug logs
    console.log('Login body:', body);

    const { username, password } = body;

    if (!username || !password) {
      console.warn('Missing credentials');
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    if (username !== mockUser.username) {
      console.warn('Invalid username');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, mockUser.passwordHash);

    if (!isValid) {
      console.warn('Invalid password');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set('session', 'valid', {
      httpOnly: true,
      path: '/',
      secure: false, // Use true if deploying over HTTPS
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}