const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { ...init, cache: 'no-store' });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}