import type { APIRoute } from 'astro';

const ALLOWED_AGENTS = [
  '*',
  'GPTBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'GoogleOther',
  'Google-Extended',
  'Bingbot',
  'CCBot',
  'cohere-ai',
  'meta-externalagent',
  'Applebot-Extended',
];

export const GET: APIRoute = async () => {
  const blocks = ALLOWED_AGENTS.map((ua) => `User-agent: ${ua}\nAllow: /`).join('\n\n');
  const body = `${blocks}\n\nSitemap: https://tokenjam.dev/sitemap-index.xml\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
