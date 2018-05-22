// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require("babel-polyfill");
require('babel-register')({
  presets: ['env', 'stage-0'],
  plugins: ['transform-async-to-generator']
})

// Import the rest of our application.
const server = module.exports = require('./src/server.js')
server.start();
