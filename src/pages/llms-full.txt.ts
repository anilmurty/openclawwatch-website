import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPublishedPosts } from '@/lib/blog';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const docs = await getCollection('docs');

  const sections: string[] = [];
  sections.push(`# TokenJam — Full Content\n\nThis file concatenates the full markdown body of every published TokenJam blog post and documentation page. URLs are absolute.\n`);

  if (posts.length > 0) {
    sections.push('---\n\n# Blog\n');
    for (const post of posts) {
      sections.push(
        `## ${post.data.title}\n\n` +
          `_Source: https://tokenjam.dev/blog/${post.id}_\n\n` +
          `${post.data.description}\n\n` +
          `${post.body ?? ''}\n`,
      );
    }
  }

  if (docs.length > 0) {
    sections.push('---\n\n# Documentation\n');
    for (const doc of docs) {
      const path = doc.id === 'index' ? '/docs' : `/docs/${doc.id}`;
      sections.push(
        `## ${doc.data.title}\n\n` +
          `_Source: https://tokenjam.dev${path}_\n\n` +
          `${doc.body ?? ''}\n`,
      );
    }
  }

  return new Response(sections.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
