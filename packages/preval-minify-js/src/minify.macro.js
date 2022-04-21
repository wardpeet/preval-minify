import { createMacro } from 'babel-plugin-macros';
import template from '@babel/template';
import { minify } from './minify';

/**
 * @param {any} taggedTemplateExpression
 * @return {string}
 */
function getTemplateExpressionContent(taggedTemplateExpression) {
  const quasiPath = taggedTemplateExpression.get('quasi');
  const string = quasiPath.parentPath.get('quasi').evaluate().value;

  if (!string) {
    throw new Error(
      'Unable to determine the value of your preval-minify-js string',
    );
  }

  return string;
}

function minifyMacro({ references }) {
  references.default.forEach((referencePath) => {
    if (referencePath.parentPath.type === 'TaggedTemplateExpression') {
      const string = getTemplateExpressionContent(referencePath.parentPath);
      const result = minify(string);
      referencePath.parentPath.replaceWith(template.statement.ast(result.code));
    } else if (referencePath.parentPath.type === 'CallExpression') {
      const options = referencePath.parentPath
        .get('arguments')[0]
        .evaluate().value;
      const string = getTemplateExpressionContent(
        referencePath.parentPath.parentPath,
      );

      const result = minify(string, options);
      referencePath.parentPath.parentPath.replaceWith(
        template.statement.ast(result.code),
      );
    }
  });
}
export default createMacro(minifyMacro);
