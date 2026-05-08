import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const doc = await getEntry('docs', 'index');
  if (!doc) return new Response('Not found', { status: 404 });
  const header = `# ${doc.data.title}\n\n${doc.data.description}\n\n---\n\n`;
  return new Response(header + (doc.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
