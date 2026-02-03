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

function toRoman(num: number) {
  const map: Array<[number, string]> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let remaining = num;
  let result = '';
  for (const [value, symbol] of map) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export function parseMarkdownSections(markdown: string): ParsedDocument {
  const lines = markdown.split(/\r?\n/);
  const sections: ParsedSection[] = [];
  let docTitle = '';
  let current: ParsedSection | null = null;
  let buffer: string[] = [];
  let sectionIndex = 0;

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
      sectionIndex += 1;
      current = {
        id: slugify(title) || `section-${sections.length + 1}`,
        title,
        number: `${toRoman(sectionIndex)}.`,
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
