/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Track names where we generate Nest suffixes
const renamedNames = [];

function stripNestjsType(typeString) {
  const target = 'import("@nestjs/common").Type<';
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

// Step 1: Flatten all .d.ts files (except index.d.ts if needed)
const dtsFiles = glob.sync(path.join(__dirname, 'dist/**/*.d.ts'));

for (const file of dtsFiles) {
  if (path.basename(file) === 'index.d.ts') {
    console.log(`⏩ Skipped index.d.ts: ${file}`);
    continue;
  }

  const dtsLines = fs.readFileSync(file, 'utf8').split('\n');
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
        `export declare type ${flatClassName} = ${flatBaseName} ${bodyStr}`,
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

  fs.writeFileSync(file, outputLines.join('\n'));
  console.log(`✅ Flattened: ${file}`);
}

// Step 2: Patch JS files for runtime exports
const jsFiles = glob.sync(path.join(__dirname, 'dist/**/*.js'));

renamedNames.forEach((name) => {
  const regex = new RegExp(`exports\\.${name} = ${name};`);
  jsFiles.forEach((file) => {
    const code = fs.readFileSync(file, 'utf8');
    if (regex.test(code)) {
      const appendLine = `\nexports.${name}Nest = ${name};\n`;
      if (!code.includes(`exports.${name}Nest =`)) {
        fs.appendFileSync(file, appendLine);
      }
    }
  });
});

console.log('✅ JS runtime patching complete.');
