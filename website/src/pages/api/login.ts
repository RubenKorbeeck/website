import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const mockUser = {
  username: 'julian',
  // hash of "test1234"
  passwordHash: '$2b$10$BOdI3zRM0Ul7k9hxxa7HfeRPBZ4D0T60Tf6Td.Z2eEQs87RW3fMgG',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const hash = await bcrypt.hash('test1234', 10);
  console.log(hash);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  if (username !== mockUser.username) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValidPassword = await bcrypt.compare(password, mockUser.passwordHash);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // ✅ Set cookie if successful
  res.setHeader('Set-Cookie', `session=valid; Path=/; HttpOnly`);
  return res.status(200).json({ message: 'Login successful' });
}
