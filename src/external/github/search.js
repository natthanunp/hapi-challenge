'use strict'

const axios = require('../../lib/request/github')

exports.get_repository = async (query, page, limit) => {
  const option = {
    method: 'get',
    url: `/search/repositories?q=${query}&page=${page}&per_page=${limit}`,
    responseType: 'json',
  }
  const response = await axios().request(option)

  return response.data
}
