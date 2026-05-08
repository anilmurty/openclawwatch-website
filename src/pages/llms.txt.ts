import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPublishedPosts } from '@/lib/blog';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const docs = await getCollection('docs');

  const blogLines = posts
    .map((p) => `- [${p.data.title}](https://tokenjam.dev/blog/${p.id}.md): ${p.data.description}`)
    .join('\n');
  const docLines = docs
    .map((d) => {
      const url = d.id === 'index' ? 'https://tokenjam.dev/docs.md' : `https://tokenjam.dev/docs/${d.id}.md`;
      return `- [${d.data.title}](${url}): ${d.data.description}`;
    })
    .join('\n');

  const content = `# TokenJam

> Open-source agent observability for autonomous AI agents. OTel-native, multi-runtime, local-first. Cost tracking, telemetry, and safety alerts for Claude Code, Codex, Cursor, OpenHands, and custom SDKs.

## About

TokenJam helps developers building AI agents understand what their agents do and what they cost. Multi-runtime support, no signup, MIT-licensed.

## Blog

${blogLines || '- (no posts yet)'}

## Documentation

${docLines}

## Optional

- [GitHub](https://github.com/metabuilder-labs/tokenjam)
- [PyPI](https://pypi.org/project/tokenjam/)
- [npm](https://www.npmjs.com/package/@tokenjam/sdk)
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
