/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'dist/index.d.ts');
let content = fs.readFileSync(FILE_PATH, 'utf8');

// 1. Remove the import
content = content.replace(
  /import \* as _nestjs_common from '@nestjs\/common';\s*/g,
  '',
);

// 2. Recursively replace _nestjs_common.Type<...> with inner content
function replaceNestjsType(input) {
  const target = '_nestjs_common.Type<';
  let output = '';
  let i = 0;

  while (i < input.length) {
    const start = input.indexOf(target, i);
    if (start === -1) {
      output += input.slice(i);
      break;
    }

    output += input.slice(i, start);
    i = start + target.length;

    // Find matching closing '>'
    let depth = 1;
    let inner = '';
    while (i < input.length && depth > 0) {
      const char = input[i];
      if (char === '<') depth++;
      else if (char === '>') depth--;
      if (depth > 0) inner += char;
      i++;
    }

    // Recurse in case of nested _nestjs_common.Type<...>
    output += replaceNestjsType(inner);
  }

  return output;
}

const finalContent = replaceNestjsType(content);

// 3. Save the result
fs.writeFileSync(FILE_PATH, finalContent);

console.log(`✅ Fully cleaned file saved to: ${FILE_PATH}`);
