const path = require('path');
const runner = require('@babel/helper-plugin-test-runner');

// sets cwd to the current package - fixes pnp
process.chdir(path.resolve(__dirname, '../'));

runner.default(__dirname);
