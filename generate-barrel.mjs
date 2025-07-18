// bun-flat-barrel.ts
import { readdirSync, statSync, rmSync, writeFileSync, existsSync } from 'fs';
import { join, resolve, relative } from 'path';

const rootDir = resolve('src');
const enumsDir = join(rootDir, 'enums');

const exportLinesRoot = [];
const exportLinesEnums = [];

function walk(dir, collector, baseDir) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, collector, baseDir);
    } else if (entry === 'index.ts') {
      const keep = [join(rootDir, 'index.ts'), join(enumsDir, 'index.ts')];
      if (!keep.includes(fullPath)) {
        rmSync(fullPath);
        console.log(`🗑️  Deleted: ${fullPath}`);
      }
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      const withoutExt = entry.replace(/\.(ts|tsx)$/, '');
      const relPath = relative(baseDir, join(dir, withoutExt)).replace(
        /\\/g,
        '/',
      );
      collector.push(`export * from "./${relPath}";`);
    }
  }
}

// Build full root exports
walk(rootDir, exportLinesRoot, rootDir);

// Build enums-only exports with relative paths from `enums/`
if (existsSync(enumsDir)) {
  walk(enumsDir, exportLinesEnums, enumsDir);
}

// Write `src/index.ts`
const rootIndexPath = join(rootDir, 'index.ts');
writeFileSync(rootIndexPath, exportLinesRoot.join('\n') + '\n');
console.log(`✅ Root barrel created at ${rootIndexPath}`);

// Write `src/enums/index.ts` with correct relative paths
if (exportLinesEnums.length > 0) {
  const enumsIndexPath = join(enumsDir, 'index.ts');
  writeFileSync(enumsIndexPath, exportLinesEnums.join('\n') + '\n');
  console.log(`✅ Enums barrel created at ${enumsIndexPath}`);
}
