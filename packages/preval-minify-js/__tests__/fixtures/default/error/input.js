const minifyJs = require('../../../../dist/minify.macro');

const myCode = minifyJs`
  const x = 'test';
  const x = 'lalal';
`;
