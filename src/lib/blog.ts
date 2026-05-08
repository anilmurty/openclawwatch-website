import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const now = new Date();
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.publishDate <= now);
  return posts.sort((a, b) => +b.data.publishDate - +a.data.publishDate);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return (await getPublishedPosts()).filter((p) => p.data.tags.includes(tag));
}

export async function getPostsByAuthor(slug: string): Promise<BlogPost[]> {
  return (await getPublishedPosts()).filter((p) => p.data.author === slug);
}

export function readingTimeMinutes(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function relatedPosts(post: BlogPost, all: BlogPost[], n = 3): BlogPost[] {
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => {
      const overlap = p.data.tags.filter((t) => post.data.tags.includes(t)).length;
      const samePillar = p.data.pillar && p.data.pillar === post.data.pillar ? 1 : 0;
      return { post: p, score: overlap * 2 + samePillar };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.post);
}
