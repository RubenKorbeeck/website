
export default function handler(req, res) {
    res.setHeader('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly');
    res.writeHead(302, { Location: '/login' });
    res.end();
  }
  