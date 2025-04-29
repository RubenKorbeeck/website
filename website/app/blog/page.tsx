'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Post = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  publishAt: string;
};

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl text-black font-semibold mb-2">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(post.publishAt ?? post.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4">
            <Link href={`/blog/${post.slug}`}>
                Read More
            </Link>
          </p>
          </div>
        ))}
      </div>
    </div>
  );
}
