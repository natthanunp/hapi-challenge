'use strict'

const axios = require('axios')

let request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

const instance = () => {
  request.defaults.baseURL = 'https://api.github.com/'

  return request
}

module.exports = instance
