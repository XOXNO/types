/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Input .d.ts file
const DTS_PATH = path.join(__dirname, 'dist/index.d.ts');
const dtsLines = fs.readFileSync(DTS_PATH, 'utf8').split('\n');

// Track names where we generate Nest suffixes
const renamedNames = [];

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

const outputLines = [];
for (let i = 0; i < dtsLines.length; i++) {
  const line = dtsLines[i];

  const baseMatch = line.match(/declare const (\w+_base): (.+);/);
  if (baseMatch) {
    const [_, baseName, baseType] = baseMatch;
    const classLine = dtsLines[i + 1] || '';
    const classMatch = classLine.match(
      /declare class (\w+) extends (\w+_base) \{/,
    );

    if (!classMatch || classMatch[2] !== baseName) {
      outputLines.push(line);
      continue;
    }

    const flatBaseName = baseName;
    const flatClassName = classMatch[1];
    const nestBaseName = `${flatClassName}Nest_base`;
    const nestClassName = `${flatClassName}Nest`;

    renamedNames.push(flatClassName);

    const flattenedBaseType = stripNestjsType(baseType);
    outputLines.push(`declare type ${flatBaseName} = ${flattenedBaseType};`);

    const bodyLines = [];
    let j = i + 2;
    while (j < dtsLines.length && !dtsLines[j].startsWith('}')) {
      const trimmed = dtsLines[j].trim();
      if (trimmed) bodyLines.push(trimmed.replace(/;$/, ''));
      j++;
    }

    const bodyStr = bodyLines.length
      ? '& {\n' + bodyLines.map((l) => '    ' + l + ';').join('\n') + '\n};'
      : ';';

    outputLines.push(
      `declare type ${flatClassName} = ${flatBaseName} ${bodyStr}`,
    );

    outputLines.push(`declare const ${nestBaseName}: ${baseType};`);
    outputLines.push(
      `export declare class ${nestClassName} extends ${nestBaseName} {`,
    );
    outputLines.push(...bodyLines.map((l) => '    ' + l + ';'));
    outputLines.push('}');

    i = j;
    continue;
  }

  outputLines.push(line);
}

// Write transformed .d.ts
const outDtsPath = DTS_PATH; // .replace('.d.ts', '.flattened.d.ts');
fs.writeFileSync(outDtsPath, outputLines.join('\n'));
console.log(`✅ Flattened .d.ts written to ${outDtsPath}`);

// Patch .js files to add runtime exports
const jsFiles = glob.sync(path.join(__dirname, 'dist/**/*.js'));

renamedNames.forEach((name) => {
  const regex = new RegExp(`exports\\.${name} = ${name};`);
  jsFiles.forEach((file) => {
    const code = fs.readFileSync(file, 'utf8');
    if (regex.test(code)) {
      const appendLine = `\nexports.${name}Nest = ${name};\n`;
      if (!code.includes(`exports.${name}Nest =`)) {
        fs.appendFileSync(file, appendLine);
        console.log(`🔧 Patched ${file} with exports.${name}Nest = ${name};`);
      }
    }
  });
});

console.log('✅ JS runtime patching complete.');
