/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'dist/index.d.ts');
let lines = fs.readFileSync(FILE_PATH, 'utf8').split('\n');

// Remove NestJS import
lines = lines.filter(
  (line) => !line.includes(`import * as _nestjs_common from '@nestjs/common'`),
);

// Flatten _nestjs_common.Type<...>
function stripNestjsType(typeString) {
  const target = '_nestjs_common.Type<';
  while (typeString.includes(target)) {
    let i = typeString.indexOf(target) + target.length;
    let depth = 1;
    let inner = '';
    while (i < typeString.length && depth > 0) {
      if (typeString[i] === '<') depth++;
      else if (typeString[i] === '>') depth--;
      if (depth > 0) inner += typeString[i];
      i++;
    }
    typeString = typeString.replace(`${target}${inner}>`, inner);
  }
  return typeString;
}

// Transformations
const outputLines = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Match: declare const Foo_base: _nestjs_common.Type<...>;
  const baseMatch = line.match(/declare const (\w+_base): (.+);/);
  if (baseMatch) {
    const [, baseName, baseType] = baseMatch;
    const cleanType = stripNestjsType(baseType);
    outputLines.push(`declare type ${baseName} = ${cleanType};`);

    // Look ahead for `declare class Foo extends Foo_base`
    const nextLine = lines[i + 1];
    const classMatch =
      nextLine && nextLine.match(/declare class (\w+) extends (\w+_base) \{/);
    if (classMatch && classMatch[2] === baseName) {
      const className = classMatch[1];
      const bodyLines = [];

      // Read the class body until we hit a closing `}`
      let j = i + 2;
      while (j < lines.length && !lines[j].startsWith('}')) {
        const trimmed = lines[j].trim();
        if (trimmed) bodyLines.push(trimmed.replace(/;$/, ''));
        j++;
      }

      // Build new type
      const bodyStr = bodyLines.length
        ? '& {\n' + bodyLines.map((b) => '    ' + b + ';').join('\n') + '\n}'
        : '';

      outputLines.push(`declare type ${className} = ${baseName} ${bodyStr}`);
      i = j; // Skip class body
      continue;
    }

    continue;
  }

  // Default: just output line
  outputLines.push(line);
}

// Save final output
fs.writeFileSync(FILE_PATH, outputLines.join('\n'));

console.log(`✅ Fully flattened types saved to: ${FILE_PATH}`);
