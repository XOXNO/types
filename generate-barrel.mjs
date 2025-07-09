// bun-flat-barrel.ts
import { readdirSync, statSync, rmSync, writeFileSync } from 'fs';
import { join, resolve, relative } from 'path';

const rootDir = resolve('src');
const exportLines = [];

function walk(dir) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (entry === 'index.ts') {
      // Delete every index.ts found (except root, handled later)
      if (fullPath !== join(rootDir, 'index.ts')) {
        rmSync(fullPath);
        console.log(`🗑️  Deleted: ${fullPath}`);
      }
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      const withoutExt = entry.replace(/\.(ts|tsx)$/, '');
      const relativePath = relative(rootDir, join(dir, withoutExt)).replace(
        /\\/g,
        '/',
      );
      exportLines.push(`export * from "./${relativePath}";`);
    }
  }
}

// Run cleanup + collect exports
walk(rootDir);

// Write flat root-level barrel
const rootIndexPath = join(rootDir, 'index.ts');
writeFileSync(rootIndexPath, exportLines.join('\n') + '\n');
console.log(`✅ Flat root barrel created at ${rootIndexPath}`);
