import { doSync } from 'do-sync';
import merge from 'deepmerge';

const DEFAULT_OPTIONS = {
  preset: ['default', { discardComments: { removeAll: true } }],
};

function canResolved(resolve) {
  try {
    return require.resolve(resolve);
  } catch (err) {
    return null;
  }
}

/**
 * @param {string} code
 * @param {Object} options
 */
export const minify = (code, options = {}) => {
  const mergedOptions = merge(DEFAULT_OPTIONS, options, {
    arrayMerge: (_, sourceArray) => sourceArray,
  });

  if (mergedOptions) {
    if (canResolved(mergedOptions.preset[0])) {
      mergedOptions.preset[0] = require.resolve(mergedOptions.preset[0]);
    } else if (canResolved(`cssnano-preset-${mergedOptions.preset[0]}`)) {
      mergedOptions.preset[0] = require.resolve(
        `cssnano-preset-${mergedOptions.preset[0]}`,
      );
    }
  }

  // Babel needs things synchronously
  const result = doSync(async (input, nanoOptions) => {
    // eslint-disable-next-line global-require
    const postcss = require('postcss');
    // eslint-disable-next-line global-require
    const cssNano = require('cssnano');

    try {
      return await postcss({
        plugins: [cssNano(nanoOptions)],
      }).process(input, { from: undefined, to: undefined });
    } catch (err) {
      return {
        error: err.message,
        stacktrace: err.stack,
      };
    }
  })(code, mergedOptions);

  if (result.error) {
    const err = new Error(result.error);
    err.stack = result.stacktrace;

    throw err;
  }

  return result;
};
