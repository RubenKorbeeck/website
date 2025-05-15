import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || !url.startsWith('/uploads/')) {
    return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', url);

  try {
    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to delete image:', err);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}