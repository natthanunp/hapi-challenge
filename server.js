'use strict'

const Hapi = require('@hapi/hapi')
const v1 = require('./src/api/routes/v1')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  })

  server.route({
    method: 'GET',
    path: '/health',
    handler: (request, h) => {
      return 'Hello World!'
    },
  })

  await server.register({
    plugin: v1,
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
