const minifyJs = require('../../../../dist/minify.macro');

const x = 'Bob'

const myCode = minifyJs`
  const hello = 'Hello';

  function greetings(name) {
    return \`\${hello} \${name}\`
  }

  console.log(greetings("${x}"));
`;

console.log(myCode)
