import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // ✅ now required

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

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

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // ✅ Extract image URLs from post content
  const imageUrls = Array.from(
    post.content.matchAll(/!\[.*?\]\((\/uploads\/.*?)\)/g)
  ).map((m) => m[1]);

  // ✅ Delete each image file from /public/uploads
  for (const url of imageUrls) {
    const filePath = path.join(process.cwd(), 'public', url);
    try {
      await fs.unlink(filePath);
      console.log(`🗑️ Deleted image: ${filePath}`);
    } catch (err) {
      console.warn(`⚠️ Failed to delete image ${filePath}:`, err);
    }
  }

  // ✅ Delete the post
  await prisma.post.delete({
    where: { slug },
  });

  return NextResponse.json({ success: true });
}
