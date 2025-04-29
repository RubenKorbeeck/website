import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '../../util/MarkdownRenderer';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  const now = new Date();

  if (
    !post ||
    !post.published ||
    (post.publishAt && new Date(post.publishAt) > now)
  ) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.publishAt ? new Date(post.publishAt).toLocaleDateString() : 'Unknown publish date'}
      </p>

      <article>
        <MarkdownRenderer content={post.content} />
      </article>
    </main>
  );
}