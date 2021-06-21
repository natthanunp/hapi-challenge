const json_transformer_controller = require('../../controllers/json_transformer_controller')

const v1 = {
  name: 'v1',
  version: '1.0.0',
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/v1/',
      handler: (request, h) => {
        return 'Hello World!'
      },
    })
  },
}

module.exports = v1
