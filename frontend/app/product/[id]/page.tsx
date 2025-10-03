'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => api(`/product/${params.id}`),
  });

  if (isLoading) return <main className="p-6">Loading...</main>;

  return (
    <main className="p-6 space-y-2">
      <h2 className="text-2xl font-semibold">{data.title}</h2>
      <div className="text-sm text-gray-500">{data.author}</div>
      <p className="mt-2">{data.description}</p>
    </main>
  );
}