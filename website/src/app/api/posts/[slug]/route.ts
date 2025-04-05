import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    const cookieStore = await cookies();      // ✅ FIXED
    const session = cookieStore.get('session');
  if (!session || session.value !== 'valid') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();

  try {
    const updated = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title,
        content,
        slug: title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, ''),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    const cookieStore = await cookies();      // ✅ FIXED
    const session = cookieStore.get('session');
  if (!session || session.value !== 'valid') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.post.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}

