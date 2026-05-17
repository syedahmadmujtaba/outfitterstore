import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const client = neon(process.env.DATABASE_URL);

export async function query<T = any>(text: string, params?: unknown[]): Promise<T[]> {
  const res = await (client as any).unsafe(text, params || []);
  return Array.isArray(res) ? res : [];
}

export { client as sql };
