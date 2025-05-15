'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import MarkdownRenderer from '../util/MarkdownRenderer';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishAt, setPublishAt] = useState('');    // ✅ NEW (datetime-local string)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

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
    const regexString = `^\\s*!\\[[^\\]]*\\]\\(${escapedUrl}\\)\\s*(\\r?\\n)?`;
    const imageMarkdownPattern = new RegExp(regexString, 'gm');

    const newContent = content.replace(imageMarkdownPattern, '');
    setContent(newContent);
  };

  const [isSubmittingAsDraft, setIsSubmittingAsDraft] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch('/api/posts', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        published: !isSubmittingAsDraft,
        publishAt: !isSubmittingAsDraft
          ? publishAt || new Date().toISOString()
          : null,
      }),
    });
  
    if (res.ok) {
      setTitle('');
      setContent('');
      setPublishAt('');
      setIsSubmittingAsDraft(false);
      router.refresh();
    } else {
      alert('Failed to create post');
    }
  };

  const extractImageUrls = (text: string): string[] => {
    return Array.from(text.matchAll(/!\[.*?\]\((\/uploads\/.*?)\)/g)).map((m) => m[1]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 p-6 bg-gray-50 border rounded shadow-sm"
    >
      {/* Left: form inputs */}
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-2xl font-semibold text-black">Add New Post</h2>

        <input
          className="w-full border px-3 py-2 rounded text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />

        <div>
          <label className="block mb-1 font-medium text-black">Post Content (Markdown)</label>
          <textarea
            ref={textareaRef}
            className="w-full border px-3 py-2 rounded text-black resize-none overflow-hidden"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write using markdown"
            required
            rows={1}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <p className="text-sm text-gray-500">It will be inserted into the content automatically.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-black font-medium">Scheduled publish time (optional):
            <input
              type="datetime-local"
              value={publishAt}
              onChange={(e) => setPublishAt(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded text-black"
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
            {publishAt && new Date(publishAt) > new Date() ? (
              <>🕓 Scheduled to publish on <strong>{new Date(publishAt).toLocaleString()}</strong></>
            ) : (
              <>✅ Will be published immediately</>
            )}
          </p>
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

        <div className="flex gap-4 justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setIsSubmittingAsDraft(false)}
          >
            Publish
          </button>

          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => setIsSubmittingAsDraft(true)}
          >
            Draft
          </button>
        </div>
      </div>

      {/* Right: live preview */}
      <div className="lg:w-1/2 bg-white p-4 border rounded max-h-[80vh] overflow-auto">
        <h3 className="text-lg font-semibold mb-2 text-black">Live Preview</h3>
        <MarkdownRenderer content={content} />
      </div>
    </form>
  );
}
