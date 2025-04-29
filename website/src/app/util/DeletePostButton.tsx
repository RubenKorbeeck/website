'use client';

import { useRouter } from 'next/navigation';

export function DeletePostButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${slug}"?`);
    if (!confirmed) return;

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      router.refresh(); // refreshes the server-rendered post list
    } else {
      alert('Failed to delete post');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
    >
      Delete
    </button>
  );
}