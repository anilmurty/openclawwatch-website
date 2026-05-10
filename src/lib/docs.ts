import { getCollection, type CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

/**
 * Section registry — controls sidebar order and display labels.
 * Each doc's frontmatter `section` value must match one of these slugs;
 * docs with unknown sections fall into a generic "Other" group at the end.
 */
export const SECTIONS: Array<{ slug: string; label: string }> = [
  { slug: 'getting-started', label: 'Getting Started' },
  { slug: 'sdks', label: 'SDKs' },
  { slug: 'cli-and-ui', label: 'CLI & Web UI' },
  { slug: 'integrations', label: 'Integrations' },
  { slug: 'reference', label: 'Reference' },
];

export interface DocsGroup {
  slug: string;
  label: string;
  docs: DocEntry[];
}

export function docUrl(doc: DocEntry): string {
  return doc.id === 'index' ? '/docs' : `/docs/${doc.id}`;
}

export async function getDocsGrouped(): Promise<DocsGroup[]> {
  const all = await getCollection('docs');
  // Group docs by section, preserving SECTIONS order. Unknown sections go to 'other'.
  const known = new Map<string, DocEntry[]>();
  SECTIONS.forEach((s) => known.set(s.slug, []));
  const other: DocEntry[] = [];

  for (const doc of all) {
    const s = doc.data.section;
    if (s && known.has(s)) known.get(s)!.push(doc);
    else other.push(doc);
  }

  const sortByOrder = (a: DocEntry, b: DocEntry) => a.data.order - b.data.order;

  const groups: DocsGroup[] = SECTIONS.map((s) => ({
    slug: s.slug,
    label: s.label,
    docs: (known.get(s.slug) ?? []).sort(sortByOrder),
  })).filter((g) => g.docs.length > 0);

  if (other.length > 0) {
    groups.push({ slug: 'other', label: 'Other', docs: other.sort(sortByOrder) });
  }
  return groups;
}

export async function getDocsFlat(): Promise<DocEntry[]> {
  const groups = await getDocsGrouped();
  return groups.flatMap((g) => g.docs);
}

export async function getPrevNext(currentId: string): Promise<{ prev: DocEntry | null; next: DocEntry | null }> {
  const flat = await getDocsFlat();
  const i = flat.findIndex((d) => d.id === currentId);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? flat[i - 1] : null,
    next: i < flat.length - 1 ? flat[i + 1] : null,
  };
}
