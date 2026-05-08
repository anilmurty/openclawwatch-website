import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '@/lib/blog';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'TokenJam Blog',
    description: 'Researching the agentic AI ecosystem.',
    site: context.site ?? 'https://tokenjam.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
      content: post.body ?? '',
    })),
    customData: `<language>en-us</language>`,
  });
}
