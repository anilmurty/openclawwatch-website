export const authors = {
  anil: {
    slug: 'anil',
    name: 'Anil Madhavapeddy',
    role: 'Founder, Metabuilder Labs',
    bio: 'Building TokenJam. Researching the agentic AI ecosystem.',
    avatar: '/authors/anil.jpg',
    twitter: '',
    github: '',
    website: '',
  },
} as const;

export type AuthorSlug = keyof typeof authors;

export function getAuthor(slug: string) {
  return (authors as Record<string, (typeof authors)[AuthorSlug]>)[slug];
}
