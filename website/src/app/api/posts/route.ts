import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies(); // ✅ await is required
  const session = cookieStore.get('session');

  if (!session || session.value !== 'valid') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
  }

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

  const post = await prisma.post.create({
    data: { title, slug, content },
  });

  return NextResponse.json(post, { status: 200 });
}

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(posts);
}