'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';

type Nav = { id: string; name: string; slug: string };

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['navigation'],
    queryFn: () => api<Nav[]>('/navigation'),
  });

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Book Store</h1>

      {isLoading && <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />}
      {error && <div className="text-red-600">API error: {(error as Error).message}</div>}

      {data && (
        <ul className="space-y-2">
          {data.map((nav) => (
            <li key={nav.id}>
              <Link className="underline" href={`/category/${nav.id}`}>{nav.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}