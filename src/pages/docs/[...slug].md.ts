import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs');
  return docs.map((doc) => ({
    params: { slug: doc.id },
    props: { doc },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const doc = (props as { doc: CollectionEntry<'docs'> }).doc;
  const header = `# ${doc.data.title}\n\n${doc.data.description}\n\n---\n\n`;
  return new Response(header + (doc.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
