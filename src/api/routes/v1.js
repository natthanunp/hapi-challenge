'use strict'

const json_transformer_controller = require('../../controllers/json_transformer_controller')

const v1 = {
  name: 'v1',
  version: '1.0.0',
  register: async function (server, options) {
    server.route({
      method: 'POST',
      path: '/v1/transform',
      handler: (request, h) => {
        return json_transformer_controller(request.payload)
      },
    })
  },
}

module.exports = v1
