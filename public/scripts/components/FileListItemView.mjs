/**
 * @module components/FileListItemView
 */

import { Node, Tag } from '../libs/markup.mjs'

/**
 * @typedef {Object} FileListItemViewAttributes
 * @property {Node} body
 */

/**
 * @function
 * @param {FileListItemViewAttributes} attributes
 * @returns {Tag}
 */
export function FileListItemView(attributes) {
  // @ts-ignore
  return new Tag('li', [attributes.body])
}
