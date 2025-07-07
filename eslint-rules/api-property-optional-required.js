module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure optional properties with ? have required: false in @ApiProperty decorators',
      category: 'TypeScript',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      addRequiredFalse:
        'Optional property "{{name}}" must have required: false in @ApiProperty decorator',
    },
  },
  create(context) {

    return {
      PropertyDefinition(node) {
        // Check if this is a TypeScript file
        const filename = context.getFilename();
        if (!filename.endsWith('.ts') && !filename.endsWith('.tsx')) {
          return;
        }

        // Check if property is optional (has ?)
        if (node.optional) {
          // Check if it has @ApiProperty decorator
          const apiPropertyDecorator = node.decorators?.find((decorator) => {
            return (
              decorator.expression.type === 'CallExpression' &&
              decorator.expression.callee.name === 'ApiProperty'
            );
          });

          if (apiPropertyDecorator) {
            const decoratorArgs = apiPropertyDecorator.expression.arguments;

            if (
              decoratorArgs.length > 0 &&
              decoratorArgs[0].type === 'ObjectExpression'
            ) {
              const properties = decoratorArgs[0].properties;
              const requiredProp = properties.find(
                (prop) => prop.key && prop.key.name === 'required',
              );

              // If no required property exists, or it's not set to false
              if (
                !requiredProp ||
                (requiredProp.value.type === 'Literal' &&
                  requiredProp.value.value !== false)
              ) {
                context.report({
                  node: apiPropertyDecorator,
                  messageId: 'addRequiredFalse',
                  data: {
                    name: node.key.name || node.key.value,
                  },
                  fix(fixer) {
                    const objectExpression = decoratorArgs[0];
                    const lastProperty =
                      objectExpression.properties[
                        objectExpression.properties.length - 1
                      ];

                    if (requiredProp) {
                      // Update existing required property
                      return fixer.replaceText(requiredProp.value, 'false');
                    } else {
                      // Add required: false property
                      const insertText =
                        objectExpression.properties.length > 0
                          ? ', required: false'
                          : 'required: false';

                      if (objectExpression.properties.length > 0) {
                        return fixer.insertTextAfter(lastProperty, insertText);
                      } else {
                        return fixer.insertTextAfter(
                          objectExpression.range[0],
                          insertText,
                        );
                      }
                    }
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};
