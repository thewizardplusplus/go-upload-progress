/**
 * @module components/IconView
 */

import { Tag } from '../libs/markup.mjs'

/**
 * @typedef {Object} IconViewAttributes
 * @property {string} name
 * @property {string} [colorStyle]
 */

/**
 * @function
 * @param {IconViewAttributes} attributes
 * @returns {Tag}
 */
export function IconView(attributes) {
  const colorStyleClass = attributes.colorStyle ? 'text-' + attributes.colorStyle : ''
  return new Tag('i', { class: `bi-${attributes.name} ${colorStyleClass}` })
}
