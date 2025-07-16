/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'dist/index.d.ts');
let lines = fs.readFileSync(FILE_PATH, 'utf8').split('\n');

// 1. Strip NestJS import entirely
lines = lines.filter(
  (line) => !line.includes(`import * as _nestjs_common from '@nestjs/common'`),
);

// 2. NestJS type cleaner
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

// 3. Transform types and classes
const outputLines = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const baseMatch = line.match(/declare const (\w+_base): (.+);/);
  if (baseMatch) {
    const [_, baseName, baseType] = baseMatch;
    const classLine = lines[i + 1] || '';
    const classMatch = classLine.match(
      /declare class (\w+) extends (\w+_base) \{/,
    );

    if (!classMatch || classMatch[2] !== baseName) {
      // Not part of a DTO pair — copy line as is
      outputLines.push(line);
      continue;
    }

    const flatBaseName = baseName;
    const flatClassName = classMatch[1];
    const nestBaseName = `${flatClassName}Nest_base`;
    const nestClassName = `${flatClassName}Nest`;

    const flattenedBaseType = stripNestjsType(baseType);

    // 1. Output flattened type
    outputLines.push(`declare type ${flatBaseName} = ${flattenedBaseType};`);

    // 2. Extract class body
    const bodyLines = [];
    let j = i + 2;
    while (j < lines.length && !lines[j].startsWith('}')) {
      const trimmed = lines[j].trim();
      if (trimmed) bodyLines.push(trimmed.replace(/;$/, ''));
      j++;
    }

    const bodyStr = bodyLines.length
      ? '& {\n' + bodyLines.map((l) => '    ' + l + ';').join('\n') + '\n};'
      : ';';

    outputLines.push(
      `declare type ${flatClassName} = ${flatBaseName} ${bodyStr}`,
    );

    // 3. Append original NestJS version, renamed
    outputLines.push(`declare const ${nestBaseName}: ${baseType};`);
    outputLines.push(
      `export declare class ${nestClassName} extends ${nestBaseName} {`,
    );
    outputLines.push(...bodyLines.map((l) => '    ' + l + ';'));
    outputLines.push('}');

    i = j; // skip past class
    continue;
  }

  // default case — just pass line through
  outputLines.push(line);
}

// Save the transformed result
fs.writeFileSync(FILE_PATH, outputLines.join('\n'));

console.log(`✅ Flattened DTOs saved to: ${FILE_PATH}`);
