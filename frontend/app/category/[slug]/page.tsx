'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', params.slug],
    queryFn: () => api<any[]>(`/categories/${params.slug}`),
  });

  return (
    <main className="p-6">
      <h2 className="text-2xl font-semibold">Categories</h2>

      {isLoading && <div className="mt-4 h-6 w-64 bg-gray-200 animate-pulse rounded" />}
      {error && <div className="text-red-600 mt-2">API error</div>}

      <ul className="mt-4 grid grid-cols-2 gap-3">
        {data?.map((c) => (
          <li key={c.id}>
            <Link className="underline" href={`/category/${params.slug}/products?categoryId=${c.id}`}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}