// bun-find-duplicate-files.ts
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const fileMap = new Map<string, string[]>();

function walk(dir: string) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      if (!fileMap.has(entry)) {
        fileMap.set(entry, []);
      }
      fileMap.get(entry)!.push(fullPath);
    }
  }
}

walk('./src');

for (const [filename, paths] of fileMap.entries()) {
  if (paths.length > 1) {
    console.log(`Duplicate: ${filename}`);
    paths.forEach((p) => console.log(`  -> ${p}`));
  }
}
