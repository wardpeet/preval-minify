import { doSync } from 'do-sync';
import merge from 'deepmerge';

const DEFAULT_OPTIONS = {
  sourceMap: false,
  module: true,
  mangle: {
    toplevel: true,
  },
  compress: {
    passes: 2,
  },
};

/**
 * @param {string} code
 * @param {Object} options
 */
export const minify = (code, options = {}) => {
  // Babel needs things synchronously
  const result = doSync(async (input, terserOptions) => {
    // eslint-disable-next-line global-require
    const { minify: terser } = require('terser');

    try {
      return await terser(input, terserOptions);
    } catch (err) {
      return {
        error: err.message,
        stacktrace: err.stack,
      };
    }
  })(
    code,
    merge(DEFAULT_OPTIONS, options, {
      arrayMerge: (_, sourceArray) => sourceArray,
    }),
  );

  if (result.error) {
    const err = new Error(result.error);
    err.stack = result.stacktrace;

    throw err;
  }

  return result;
};
