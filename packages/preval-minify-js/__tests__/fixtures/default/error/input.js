const minifyJs = require('../../../../dist/minify.macro');

minifyJs`
  const x = 'test';
  const x = 'lalal';
`;
