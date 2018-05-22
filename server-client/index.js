// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
  presets: ['env', 'stage-0']
})

// Import the rest of our application.
module.exports = require('./src/client.js')
