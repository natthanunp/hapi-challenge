'use strict'

const transformer_service = require('../services/transformer_service')

/**
 *
 * @param {object} json_input
 * @returns {object} json_output
 */
const json_transformer_controller = (json_input) => {
  const json_output = transformer_service.transform(json_input)

  return json_output
}

module.exports = json_transformer_controller