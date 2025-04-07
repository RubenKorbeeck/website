'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MarkdownRenderer from '@/app/util/MarkdownRenderer';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      alert('Failed to upload image');
      return;
    }

    const data = await res.json();
    const markdown = `\n\n![Image](${data.url})\n\n`;
    setContent((prev) => prev + markdown);
  };

  const handleDeleteImage = async (url: string) => {
    console.log('deleting');
    const confirmed = confirm(`Delete image: ${url}?`);
    if (!confirmed) return;
  
    const res = await fetch('/api/delete-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
  
    if (!res.ok) {
      alert('Failed to delete image');
      return;
    }
  
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


    const regexString =
    '^\\s*!\\[[^\\]]*\\]\\(' + escapedUrl + '\\)\\s*(\\r?\\n)?';
  
    const imageMarkdownPattern = new RegExp(regexString, 'gm');
    console.log('📜 regex:', imageMarkdownPattern);
    
    const matches = content.match(imageMarkdownPattern);
    console.log('🧩 matches:', matches);
    
    const newContent = content.replace(imageMarkdownPattern, '');
    console.log('🧽 updated content:', newContent);
    
    setContent(newContent);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      router.refresh();
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border p-6 rounded shadow-sm bg-gray-50">
      <h2 className="text-2xl font-semibold">Add New Post</h2>

      <input
        className="w-full border px-3 py-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
      />

      <div>
        <label className="block mb-1 font-medium">Post Content (Markdown)</label>
        <textarea
          className="w-full border px-3 py-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write using markdown"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <p className="text-sm text-gray-500">It will be inserted into the content automatically.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Live Preview</h3>
        <MarkdownRenderer content={content} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Publish
      </button>
    </form>
  );
}