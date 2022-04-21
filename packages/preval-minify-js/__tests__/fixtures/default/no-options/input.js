const minifyJs = require('../../../../dist/minify.macro');

minifyJs`
  const hello = 'Hello'

  function greetings(name) {
    return \`\${hello} \${name}\`
  }

  console.log(greetings('Bob'));
`;
