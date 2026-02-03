import fs from 'node:fs';
import path from 'node:path';
import { HomeClient } from './HomeClient';
import { parseMarkdownSections } from '@/lib/markdown';

export default function Home() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'synthesis-memo-final-v2.md');
  const markdown = fs.readFileSync(filePath, 'utf8');
  const { sections } = parseMarkdownSections(markdown);

  return <HomeClient sections={sections} />;
}
