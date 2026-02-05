import fs from 'node:fs';
import path from 'node:path';
import { HomeClient } from './HomeClient';
import { parseMarkdownSections } from '@/lib/markdown';

export default function Home() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'synthesis-memo-v5-final.md');
  const markdown = fs.readFileSync(filePath, 'utf8');
  const { sections, preface } = parseMarkdownSections(markdown);

  return <HomeClient sections={sections} preface={preface} />;
}
