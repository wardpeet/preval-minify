<div align="center">
<h1>preval-minify-js.macro</h1>

<p>Minify js code snippets at built-time</p>
</div>

---

## The problem

Plugins, libraries, and tooling can have generated code snippets based on user options. These snippets are mostly uncompressed and unoptimized to keep the source code readable and maintainable.

Uncompressed code comes at a cost for our users. More bytes means more network time and CPU time.

## Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies:

```bash
npm install --save-dev preval-minify-js.macro
```

## Usage

```js
const minifyJs = require('preval-minify-js.macro');
const snippet = minifyJs`
  (function() {
    var myCoolText = 'hello';

    console.log(myCoolText);
  })()
`;

const testScript = document.createElement('script');
testScript.src = snippet;
document.body.appendChild(testScript);

//      ↓ ↓ ↓ ↓ ↓ ↓

const snippet = `console.log("hello");`;
const testScript = document.createElement('script');
testScript.src = snippet;
document.body.appendChild(testScript);
```

### With Terser options

You can pass all [Terser options](https://terser.org/docs/api-reference#minify-options) to the function.

```js
const minifyJs = require('preval-minify-js.macro');
const snippet = minifyJs({
  format: {
    beautify: true,
  },
})`
  const hello = 'Hello';

  function greetings(name) {
    return \`\${hello} \${name}\`
  }

  console.log(greetings('Bob'))
`;

const testScript = document.createElement('script');
testScript.src = snippet;
document.body.appendChild(testScript);

//      ↓ ↓ ↓ ↓ ↓ ↓

const snippet = `const o = "Hello";

function l(o) {
    return "Hello " + o;
}

console.log(l("Bob"));`;
const testScript = document.createElement('script');
testScript.src = snippet;
document.body.appendChild(testScript);
```

### Babel-plugin-macros

This project is dependant on [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros). You'll have to install `babel-plugin-macros` and configure Babel to use it. Most frameworks like Create-react-app, Gatsby, Nuxtjs, Nextjs have it configured by default.
