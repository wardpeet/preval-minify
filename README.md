<div align="center">
<h1>preval-minify</h1>

<p>Minify css & js code snippets at built-time</p>
</div>

---

## The problem

Plugins, libraries, and tooling can have generated code snippets based on user options. These snippets are mostly uncompressed and unoptimized to keep the source code readable and maintainable.

Uncompressed code comes at a cost for our users. More bytes means more network time and CPU time.

### Supports

- Javascript minification with terser: [preval-minify-js](packages/preval-minify-js/README.md)
- CSS minification with cssnano: [preval-minify-css](packages/preval-minify-css/README.md)

## Solution

Minify your "dynamic" code snippets at build time.

### Minify JS:

```js
const jsMinify = require('preval-minify-js.macro');
const snippet = jsMinify`
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

### Minify CSS:

```js
const cssMinify = require('preval-minify-css.macro');
const snippet = cssMinify`
  .image {
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: black;
  }
`;

const testStyle = document.createElement('style');
testStyle.innerHTML = snippet;
document.head.appendChild(testStyle);

//      ↓ ↓ ↓ ↓ ↓ ↓

const snippet = `.image{border-radius:5px;border:1px solid #000}`;
const testStyle = document.createElement('style');
testStyle.innerHTML = snippet;
document.head.appendChild(testStyle);
```

## How to use

This project is dependant on [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros). You'll have to install `babel-plugin-macros` and configure Babel to use it. Most frameworks like Create-react-app, Gatsby, Nuxtjs, Nextjs have it configured by default.

For more information on usage I suggest going into the readme of [preval-minify-js](packages/preval-minify-js/README.md) and [preval-minify-css](packages/preval-minify-css/README.md)
