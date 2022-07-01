const minifyJs = require('../../../../dist/minify.macro');

const myCode = minifyJs`
  const hello = 'Hello'

  function greetings(name) {
    return \`\${hello} \${name}\`
  }

  console.log(greetings('Bob'));
`;
