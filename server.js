'use strict'

var Path = require('path')
const Hapi = require('@hapi/hapi')
const HapiSwagger = require('hapi-swagger')
const hbs = require('hbs')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const v1 = require('./src/api/routes/v1')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  })
  const swaggerOptions = {
    info: {
      title: 'Hapi-challenge',
      version: 'v1.0.0',
    },
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ])

  server.views({
    engines: {
      html: hbs,
    },
    path: Path.join(__dirname, 'src/views'),
  })

  server.route({
    method: 'GET',
    path: '/health',
    handler: () => {
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
