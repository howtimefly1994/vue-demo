'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API:'"http://localhost:3000/"'
  // API:'"http://49.235.129.13:3000/"'
  // API:'"http://chen1994.club:3000/"'
})
