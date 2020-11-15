<div align="center">
<h1>preval-minify-css.macro</h1>

<p>Minify css code snippets at built-time</p>
</div>

---

## The problem

Plugins, libraries, and tooling can have generated code snippets based on user options. These snippets are mostly uncompressed and unoptimized to keep the source code readable and maintainable.

Uncompressed code comes at a cost for our users. More bytes means more network time and CPU time.

## Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies:

```bash
npm install --save-dev preval-minify-css.macro
```

## Usage

```js
const minifyCss = require('preval-minify-css.macro');
const snippet = minifyCss`
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

### With cssNano options

You can pass all [cssNano options](https://cssnano.co/docs/config-file#options) to the function.

```js
const minifyCss = require('preval-minify-css.macro');
const snippet = minifyCss({
  presets: ['advanced', { discardComments: false }],
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

const testStyle = document.createElement('style');
testStyle.innerHTML = snippet;
document.head.appendChild(testStyle);

//      ↓ ↓ ↓ ↓ ↓ ↓

const snippet = `.myClass{background:#000;font-weight:400;z-index:2}.myClass2{z-index:1}`;
const testStyle = document.createElement('style');
testStyle.innerHTML = snippet;
document.head.appendChild(testStyle);
```

### Babel-plugin-macros

This project is dependant on [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros). You'll have to install `babel-plugin-macros` and configure Babel to use it. Most frameworks like Create-react-app, Gatsby, Nuxtjs, Nextjs have it configured by default.
