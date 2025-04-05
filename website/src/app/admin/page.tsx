import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import NewPostForm from './NewPostForm';
import Link from 'next/link';
import { DeletePostButton } from '@/app/util/DeletePostButton';


export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session || session.value !== 'valid') {
    redirect('/login');
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <NewPostForm />

      <h2 className="text-2xl font-semibold mt-12 mb-4">All Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <div className="font-semibold text-lg">{post.title}</div>
            <div className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </div>
            <div className="text-sm text-gray-700 italic mb-2">/{post.slug}</div>

            <div className="flex gap-2">
              <Link
                href={`/admin/edit/${post.slug}`}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <DeletePostButton slug={post.slug} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}