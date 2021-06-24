'use strict'

const github_search_api = require('../../../external/github/search')
const { PAGINATE_LIMIT_PER_PAGE } = require('../../../config').config
/**
 *
 * @param {string} channel_id
 */
const get_repositories = async (query, page) => {
  return await github_search_api.get_repository(
    query,
    page,
    PAGINATE_LIMIT_PER_PAGE
  )
}

module.exports = {
  get_repositories,
}
