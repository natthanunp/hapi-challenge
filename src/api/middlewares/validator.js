'use strict'

const Joi = require('joi')

module.exports = {
  'get/v1/search/repositories': {
    query: Joi.object({
      keyword: Joi.string().min(1).required(),
      page: Joi.number().integer().min(1).required(),
    }),
  },
  'post/v1/transform': {
    payload: Joi.object().pattern(
      /\d/,
      Joi.array().items(
        Joi.object().keys({
          id: Joi.number().integer().required(),
          title: Joi.string().required(),
          level: Joi.number().integer().required(),
          children: Joi.array().items().required(),
          parent_id: Joi.number().integer().allow(null).required(),
        })
      )
    ),
  },
}
