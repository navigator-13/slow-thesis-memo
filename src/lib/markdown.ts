export type ParsedSection = {
  id: string;
  title: string;
  number: string | null;
  content: string;
};

export type ParsedDocument = {
  title: string;
  sections: ParsedSection[];
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function parseMarkdownSections(markdown: string): ParsedDocument {
  const lines = markdown.split(/\r?\n/);
  const sections: ParsedSection[] = [];
  let docTitle = '';
  let current: ParsedSection | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (!current) return;
    current.content = buffer.join('\n').trim();
    sections.push(current);
  };

  for (const line of lines) {
    const h1 = line.match(/^# (.+)$/);
    if (h1) {
      docTitle = h1[1].trim();
      continue;
    }

    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      flush();
      buffer = [];
      const title = h2[1].trim();
      current = {
        id: slugify(title) || `section-${sections.length + 1}`,
        title,
        number: null,
        content: '',
      };
      continue;
    }

    buffer.push(line);
  }

  flush();
  return {
    title: docTitle,
    sections,
  };
}
