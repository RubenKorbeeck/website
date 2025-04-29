import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';




export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || session.value !== 'valid') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, published = false, publishAt = null } = await req.json();

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

  const post = await prisma.post.create({
    data: {
      title,
      content,
      slug,
      published,
      publishAt: publishAt ? new Date(publishAt) : null,
    },
  });

  return NextResponse.json(post);
}

export async function GET() {

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { publishAt: null },
        { publishAt: { lte: new Date() } },
      ],
    },
    orderBy: [
      {
        publishAt: 'desc',
      },
      {
        createdAt: 'desc', // fallback if publishAt is null
      },
    ],
  });

  return NextResponse.json(posts);
}
