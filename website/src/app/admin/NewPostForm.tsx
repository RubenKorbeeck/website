'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      router.refresh(); // refresh the server component list
    } else {
      alert('Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded shadow-sm bg-gray-50">
      <h2 className="text-xl font-semibold">Add New Post</h2>
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Content (Markdown)</label>
        <textarea
          className="w-full border px-3 py-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content..."
          required
        />
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