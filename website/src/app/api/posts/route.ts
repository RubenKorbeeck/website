import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';



export async function POST(req: NextRequest) {
  const cookieStore = await cookies();      // ✅ FIXED
  const session = cookieStore.get('session');
  if (!session || session.value !== 'valid') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json(); // ✅ use JSON

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

  const post = await prisma.post.create({
    data: { title, content, slug },
  });

  return NextResponse.json(post);
}

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(posts);
}