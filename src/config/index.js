'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

let config = {
  NODE_ENV: process.env.NODE_ENV,
  GITHUB_PAGE_LIMIT: 100,
  PAGINATE_LIMIT_PER_PAGE: 10,
}

module.exports = {
  config,
}
