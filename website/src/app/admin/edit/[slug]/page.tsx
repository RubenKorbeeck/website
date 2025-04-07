'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MarkdownRenderer from '@/app/util/MarkdownRenderer';

function getLocalDateTimeString() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [publishAt, setPublishAt] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const post = await res.json();
        setTitle(post.title);
        setContent(post.content);
        setPublished(post.published ?? false);
        setPublishAt(post.publishAt ? new Date(post.publishAt).toISOString().slice(0, 16) : '');
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
      body: JSON.stringify({
        title,
        content,
        published,
        publishAt: publishAt || null,
      }),
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
    const imageMarkdownPattern = new RegExp(`^\\s*!\$begin:math:display$[^\\$end:math:display$]*\\]\$begin:math:text$${escapedUrl}\\$end:math:text$\\s*(\\r?\\n)?`, 'gm');

    const newContent = content.replace(imageMarkdownPattern, '');
    setContent(newContent);
  };

  const extractImageUrls = (text: string): string[] => {
    return Array.from(text.matchAll(/!\[.*?\]\((\/uploads\/.*?)\)/g)).map((m) => m[1]);
  };

  

  return (
    <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl mx-auto p-6 bg-gray-50 border rounded">
      <h1 className="text-2xl font-bold text-black">Edit Post</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded text-black"
        placeholder="Post title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded text-black h-48"
        placeholder="Markdown content"
        required
      />

      <div className="space-y-2">
        <label className="block text-black font-medium">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setPublished(isChecked);
              if (isChecked) {
                setPublishAt(getLocalDateTimeString); // ✅ Format for datetime-local
              } else {
                setPublishAt('');
              }
            }}
            className="mr-2"
          />
          Do you want to publish?
        </label>

        <label className="block text-black font-medium">
          Scheduled publish time (optional):
          <input
            type="datetime-local"
            value={publishAt}
            onChange={(e) => setPublishAt(e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded text-black"
            placeholder="YYYY-MM-DDTHH:MM"
          />
        </label>

        {publishAt && (
          <button
            type="button"
            className="text-sm text-blue-600 underline"
            onClick={() => setPublishAt('')}
          >
            Clear scheduled date
          </button>
        )}

        <p className="text-sm text-gray-700 mt-1">
          {published ? (
            publishAt && new Date(publishAt) > new Date() ? (
              <>🕓 Scheduled to publish on <strong>{new Date(publishAt).toLocaleString()}</strong></>
            ) : (
              <>✅ Will be published immediately</>
            )
          ) : (
            <>🚫 This post is currently a <strong>draft</strong></>
          )}
        </p>
      </div>

      <div>
        <label className="block font-medium mb-1 text-black">Upload image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-black mt-4 mb-2">Images in post</h2>
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
        <h2 className="text-lg font-semibold mt-4 text-black mb-2">Live Preview</h2>
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