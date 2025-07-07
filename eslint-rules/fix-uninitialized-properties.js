module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Add definite assignment assertion (!) to uninitialized class properties',
      category: 'TypeScript',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      addDefiniteAssignment: 'Add definite assignment assertion (!) to property "{{name}}"',
    },
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    
    return {
      PropertyDefinition(node) {
        // Check if this is a TypeScript file
        const filename = context.getFilename();
        if (!filename.endsWith('.ts') && !filename.endsWith('.tsx')) {
          return;
        }

        // Check if property has no initializer and has a type annotation
        if (!node.value && node.typeAnnotation && !node.definite) {
          // Check if it's not optional (doesn't have ?)
          const text = sourceCode.getText(node);
          if (!text.includes('?')) {
            context.report({
              node,
              messageId: 'addDefiniteAssignment',
              data: {
                name: node.key.name || node.key.value,
              },
              fix(fixer) {
                // Get the property name end position
                const propertyNameEnd = node.key.range[1];
                // Insert ! after the property name
                return fixer.insertTextAfterRange([propertyNameEnd, propertyNameEnd], '!');
              },
            });
          }
        }
      },
    };
  },
};