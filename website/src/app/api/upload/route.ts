import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${uuid()}-${file.name}`;
  const uploadPath = path.join(process.cwd(), 'public/uploads', filename);
  await writeFile(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}