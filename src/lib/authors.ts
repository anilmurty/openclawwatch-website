export const authors = {
  'anil-murty': {
    slug: 'anil-murty',
    name: 'Anil Murty',
    role: 'Founder, Metabuilder Labs',
    bio: 'Anil Murty is the founder of Metabuilder Labs. Anil started his career as a firmware engineer, moved up the stack into application software and product roles and along the way, worked on everything from consumer hardware, wired and wireless networks, cloud automation and observability to decentralized networks and blockchains.',
    link: 'https://www.linkedin.com/in/anilmurty/',
  },
  'ansh-saxena': {
    slug: 'ansh-saxena',
    name: 'Ansh Saxena',
    role: 'Engineer, Metabuilder Labs',
    bio: 'Ansh Saxena is an engineer and open source software developer.',
    link: 'https://github.com/anshss',
  },
} as const;

export type AuthorSlug = keyof typeof authors;

export function getAuthor(slug: string) {
  return (authors as Record<string, (typeof authors)[AuthorSlug]>)[slug];
}
