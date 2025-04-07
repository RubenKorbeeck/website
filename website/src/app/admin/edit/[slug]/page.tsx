'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MarkdownRenderer from '@/app/util/MarkdownRenderer';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  const router = useRouter();
  const params = useParams(); // ✅ get dynamic route params from the router
  const slug = params.slug as string; // ✅ safely cast it to string
  useEffect(() => {
    if (!slug) return;
    

    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const post = await res.json();
        setTitle(post.title);
        setContent(post.content);
        setOriginalSlug(post.slug);
      } else {
        alert('Failed to load post');
        router.push('/admin');
      }
    };

    fetchPost();
  }, [slug, router]);


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${originalSlug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Failed to update post');
    }
  };

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

  const extractImageUrls = (text: string): string[] => {
    return Array.from(text.matchAll(/!\[.*?\]\((\/uploads\/.*?)\)/g)).map(m => m[1]);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl mx-auto p-6 bg-gray-50 border rounded">
      <h1 className="text-2xl font-bold">Edit Post</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="Post title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded h-48"
        placeholder="Markdown content"
        required
      />

      <div>
        <label className="block font-medium mb-1">Upload image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-4 mb-2">Images in post</h2>
        <ul className="space-y-2">
          {extractImageUrls(content).map((url) => (
            <li key={url} className="flex items-center gap-4">
              <img src={url} alt="" className="h-20 rounded shadow" />
              <button
                type="button"
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleDeleteImage(url)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-4 mb-2">Live Preview</h2>
        <MarkdownRenderer content={content} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}