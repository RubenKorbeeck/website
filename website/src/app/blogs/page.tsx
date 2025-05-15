'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../util/navbar';

// Extend Post type to include markdown content and extracted cover image URL
type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;            // markdown
  createdAt: string;
  publishAt: string;
  coverImageUrl?: string;    // extracted from content
};

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data: Post[]) => {
        const enriched = data.map((post) => {
          const match = post.content.match(/!\[[^\]]*\]\(([^)]+)\)/);
          return { ...post, coverImageUrl: match ? match[1] : undefined };
        });
        setPosts(enriched);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load posts', err);
        setLoading(false);
      });
  }, []);

  const displayedPosts = loading ? [] : posts.slice(0, visibleCount);
  const hasMore = posts.length > visibleCount;

  const getExcerpt = (content: string, length = 100) => {
    const plain = content
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // remove images
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // remove links
      .replace(/[\n#>*_`-]/g, '') // remove markdown and newlines
      .trim();
    return plain.length > length ? plain.slice(0, length) + '…' : plain;
  };

  return (
    <div>
      <Navbar showLogoImmediately />
      <div className="container mx-auto px-4 pt-32 py-8 bg-[var(--background)] min-h-screen">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-[4/3] bg-gray-200 animate-pulse rounded-lg"
                />
              ))
            : displayedPosts.map((post) => (
                <div
                  key={post.id}
                  className="group [perspective:1000px] w-full"
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg shadow-md transform transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front face */}
                    <div className="absolute inset-0 rounded-lg [transform:rotateY(0deg)] [backface-visibility:hidden]">
                      <Link
                        key={post.id}
                        href={`/blogs/${post.slug}`}
                        className="block bg-white rounded-lg transition-shadow duration-300"
                      >
                        {/* Image container with 4:3 aspect ratio */}
                        <div className="w-full aspect-[4/3] bg-gray-100">
                          {post.coverImageUrl ? (
                            <img
                              src={post.coverImageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>

                        {/* Title and date */}
                        <div className="absolute bottom-0 left-0 w-full bg-white p-4">
                          <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                            {post.title}
                          </h2>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(post.publishAt ?? post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Back face (invisible, matches background) */}
                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-white rounded-lg">
                      <Link
                          href={`/blogs/${post.slug}`}
                          className="mt-auto text-green-600  font-semibold"
                        >
                        <h2 className="text-xl font-semibold p-4 text-black mb-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-gray-700 mb-4 p-4 flex-grow overflow-auto">
                          {getExcerpt(post.content, 150)}
                        </p>
                        <p className="p-4">Read More →</p>
                        
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setVisibleCount(posts.length)}
            className="mt-8 mx-auto block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
        }