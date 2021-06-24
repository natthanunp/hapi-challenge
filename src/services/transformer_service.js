'use strict'

/**
 *  @param {object} input
 *  @returns {object} output
 */
const transform = (input) => {
  const data = extract_elements_from_object(input)
  const id_mapping = data.reduce((accumulator, element, index) => {
    accumulator[element.id] = index
    return accumulator
  }, {})
  const output = parent_child_mapping(data, id_mapping)

  return output
}

/**
 *  @param {object} input
 *  @returns {array} extracted
 */
const extract_elements_from_object = (input) => {
  const obj = Object.values(input)
  const extracted = []
  for (const element of obj) {
    for (const inner_element of element) {
      extracted.push(inner_element)
    }
  }

  return extracted
}

/**
 *  @param {array} data
 *  @param {array} id_mapping
 *  @returns {object} result
 */
const parent_child_mapping = (data, id_mapping) => {
  let result
  data.forEach((element) => {
    // Handle the root element
    if (element.parent_id === null) {
      result = element

      return
    }
    const parent_element = data[id_mapping[element.parent_id]]
    parent_element.children = [...(parent_element.children), element]
  })

  return result
}

module.exports = { transform }
