const minifyJs = require('../../../../dist/minify.macro');

const x = minifyJs`
  const x = 'test';
  const x = 'lalal';
`;
