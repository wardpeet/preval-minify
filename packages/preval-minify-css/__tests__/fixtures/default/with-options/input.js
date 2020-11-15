const minifyCss = require('../../../../dist/minify.macro');

const x = minifyCss({
  preset: ['cssnano-preset-advanced', { discardComments: { removeAll: true } }]
})`
  .myClass {
    background: #000;
    font-weight: 400;
    font-weight: 400;
    z-index: 999;
  }
  .myClass2 {
    z-index: 888;
  }
`;
