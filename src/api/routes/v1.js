'use strict'

const Path = require('path')
const { GITHUB_PAGE_LIMIT } = require('../../config/').config
const validator = require('../middlewares/validator')
const get_repository_controller = require('../../controllers/get_repositories_controller')
const json_transformer_controller = require('../../controllers/json_transformer_controller')

const v1 = {
  name: 'v1',
  version: '1.0.0',
  register: async function (server, options) {
    //Styles
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, '../../views'),
        },
      },
    })

    //Home
    server.route({
      method: 'GET',
      path: '/v1/home',
      handler: async (request, h) => {
        return h.view('index')
      },
    })

    server.route({
      method: 'GET',
      path: '/v1/search/repositories',
      handler: async (request, h) => {
        const repositories = await get_repository_controller(
          request.query.keyword,
          request.query.page
        )
        const page_count = GITHUB_PAGE_LIMIT
        const page_array = [...Array(page_count).keys()].map((i) => i + 1)
        return h.view('search', {
          keyword: request.query.keyword,
          page: page_array,
          items: repositories.items,
        })
      },
      options: {
        tags: ['api', 'search'],
        validate: validator['get/v1/search/repositories'],
      },
    })

    server.route({
      method: 'POST',
      path: '/v1/transform',
      handler: (request, h) => {
        return json_transformer_controller(request.payload)
      },
      options: {
        tags: ['api', 'transform'],
        validate: validator['post/v1/transform'],
      },
    })
  },
}

module.exports = v1
