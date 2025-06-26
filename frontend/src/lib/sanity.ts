/**
 * Sanity data fetching utility for server-side and static generation.
 * Uses GROQ queries and environment variables for configuration.
 *
 * Usage:
 *   import { fetchSanity } from '@/lib/sanity';
 *   const data = await fetchSanity<MyType>(`*[_type == "post"]{title, slug}`);
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset || !apiVersion) {
  throw new Error('Missing Sanity environment variables.');
}

const SANITY_API_URL = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

export async function fetchSanity<T = any>(
  query: string,
  params: Record<string, any> = {},
  options: { token?: string } = {}
): Promise<T> {
  const url = new URL(SANITY_API_URL);
  url.searchParams.set('query', query);
  if (Object.keys(params).length > 0) {
    url.searchParams.set('params', JSON.stringify(params));
  }
  const headers: Record<string, string> = {};
  const authToken = options.token || token;
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  const res = await fetch(url.toString(), { headers } as RequestInit);
  if (!res.ok) {
    throw new Error(`Sanity fetch error: ${res.status} ${res.statusText}`);
  }
  const { result } = await res.json();
  return result as T;
}
