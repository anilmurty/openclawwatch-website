import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const now = new Date();
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = (props as { post: CollectionEntry<'blog'> }).post;
  const fm = post.data;
  const header = [
    `# ${fm.title}`,
    '',
    fm.description,
    '',
    `_Published ${fm.publishDate.toISOString().slice(0, 10)}${fm.lastUpdated ? `, updated ${fm.lastUpdated.toISOString().slice(0, 10)}` : ''}._`,
    '',
    '---',
    '',
  ].join('\n');
  return new Response(header + (post.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
