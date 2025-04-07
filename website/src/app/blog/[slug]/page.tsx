import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/app/util/MarkdownRenderer';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
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
        {new Date(post.publishAt).toLocaleDateString()}
      </p>

      <article>
        <MarkdownRenderer content={post.content} />
      </article>
    </main>
  );
}