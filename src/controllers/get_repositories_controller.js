'use strict'

const search_provider = require('../adapters/external/github/search_provider')

/**
 *
 * @param {string} keyword
 * @param {string} page
 * @returns {object}
 */
const get_repository_controller = async (keyword, page) => {
    return await search_provider.get_repositories(keyword, page)
}

module.exports = get_repository_controller