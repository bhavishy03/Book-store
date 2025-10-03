'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function CategoryProductsPage() {
  const sp = useSearchParams();
  const categoryId = sp.get('categoryId')!;
  const page = Number(sp.get('page') || '1');

  const { data, isLoading } = useQuery({
    queryKey: ['products', categoryId, page],
    queryFn: () => api<{ items: any[]; page: number }>(`/products/${categoryId}?page=${page}`),
    keepPreviousData: true,
    enabled: !!categoryId,
  });

  return (
    <main className="p-6">
      <h2 className="text-2xl font-semibold">Products</h2>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-40 bg-gray-200 animate-pulse rounded" />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {data?.items.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="border p-3 rounded hover:shadow">
                <div className="font-medium line-clamp-2">{p.title}</div>
                <div className="text-sm text-gray-500">{p.author}</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <a className="underline" href={`?categoryId=${categoryId}&page=${Math.max(1, page - 1)}`}>Prev</a>
            <a className="underline" href={`?categoryId=${categoryId}&page=${page + 1}`}>Next</a>
          </div>
        </>
      )}
    </main>
  );
}