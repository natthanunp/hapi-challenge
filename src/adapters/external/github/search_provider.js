'use strict'

const github_search_api = require('../../../api/external/github/search')
const { PAGINATE_LIMIT_PER_PAGE } = require('../../../config').config
/**
 *
 * @param {string} channel_id
 */
const get_repositories = async (query, page, limit) => {
  try {
    return await github_search_api.get_repository(
      query,
      page,
      PAGINATE_LIMIT_PER_PAGE
    )
  } catch (e) {
    throw e
  }
}

module.exports = {
  get_repositories,
}
