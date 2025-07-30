/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') && !file.endsWith('.spec.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let inClass = false;
  let className = '';
  let missingDecorators = [];
  let currentIndent = 0;
  let inDecorator = false;
  let bracketCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for class declaration
    if (trimmed.match(/^(export\s+)?(class|interface)\s+(\w+)/)) {
      const match = trimmed.match(/^(export\s+)?(class|interface)\s+(\w+)/);
      if (match[2] === 'class') {
        inClass = true;
        className = match[3];
        currentIndent = line.search(/\S/);
      }
    }

    // Track decorator state
    if (trimmed.startsWith('@ApiProperty')) {
      inDecorator = true;
      bracketCount = 0;
    }

    if (inDecorator) {
      bracketCount += (line.match(/\{/g) || []).length;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      bracketCount -= (line.match(/\}/g) || []).length;
      if (trimmed.endsWith('})')) {
        inDecorator = false;
      }
    }

    // Check for end of class
    if (inClass && line.search(/\S/) <= currentIndent && trimmed === '}') {
      inClass = false;
    }

    // Check for property without @ApiProperty
    if (
      inClass &&
      !inDecorator &&
      trimmed &&
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('*')
    ) {
      // Look for property declarations (exclude properties with ! definite assignment)
      const propMatch = trimmed.match(/^(\w+)(\?)?(!)?:\s*(.+?)(;|$)/);
      if (
        propMatch &&
        !trimmed.startsWith('constructor') &&
        !trimmed.startsWith('private') &&
        !trimmed.startsWith('protected') &&
        !trimmed.includes('=>') // Skip arrow functions
      ) {
        // Check if previous lines have @ApiProperty
        let hasDecorator = false;
        for (let j = i - 1; j >= 0 && j > i - 5; j--) {
          if (
            lines[j].includes('@ApiProperty') ||
            lines[j].includes('@ApiPropertyOptional')
          ) {
            hasDecorator = true;
            break;
          }
          if (
            lines[j].trim() &&
            !lines[j].trim().startsWith('@') &&
            !lines[j].trim().startsWith('*') &&
            !lines[j].trim().startsWith('//')
          ) {
            break;
          }
        }

        if (!hasDecorator) {
          missingDecorators.push({
            line: i + 1,
            property: propMatch[1],
            optional: !!propMatch[2],
            type: propMatch[4].replace(';', '').trim(),
            className,
          });
        }
      }
    }
  }

  return missingDecorators;
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const tsFiles = findTsFiles(srcDir);

console.log(`Found ${tsFiles.length} TypeScript files`);

const filesWithMissing = [];

tsFiles.forEach((file) => {
  const missing = analyzeFile(file);
  if (missing.length > 0) {
    filesWithMissing.push({
      file: file.replace(__dirname + '/', ''),
      missing,
    });
  }
});

console.log(
  `\nFound ${filesWithMissing.length} files with missing @ApiProperty decorators:\n`,
);

filesWithMissing.forEach(({ file, missing }) => {
  console.log(`${file}:`);
  missing.forEach(({ property, optional, type, className, line }) => {
    console.log(
      `  Line ${line}: ${className}.${property}${optional ? '?' : ''}: ${type}`,
    );
  });
  console.log('');
});

// Save results to JSON for processing
fs.writeFileSync(
  'missing-decorators.json',
  JSON.stringify(filesWithMissing, null, 2),
);
console.log('\nResults saved to missing-decorators.json');
