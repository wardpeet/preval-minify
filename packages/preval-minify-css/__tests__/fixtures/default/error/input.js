const minifyCss = require('../../../../dist/minify.macro');

const x = minifyCss`
  .myClass {
    background: #000;
    font-weight: 400;
    font-weight: 400;  
`;
