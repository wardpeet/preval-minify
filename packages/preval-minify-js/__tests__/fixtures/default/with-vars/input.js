const minifyJs = require('../../../../dist/minify.macro');

const x = 'Bob'

minifyJs`
  const hello = 'Hello';

  function greetings(name) {
    return \`\${hello} \${name}\`
  }

  console.log(greetings("${x}"));
`;
