/**
 * @module components/SuccessUploadMessageViews
 */

import { Node, Text, Tag } from '../libs/markup.mjs'

/**
 * @typedef {Object} SuccessUploadMessageViewsAttributes
 * @property {string} filename
 */

/**
 * @function
 * @param {SuccessUploadMessageViewsAttributes} attributes
 * @returns {Array.<Node>}
 */
export function SuccessUploadMessageViews(attributes) {
  return [
    new Text('The '),
    // @ts-ignore
    new Tag('code', [new Text(attributes.filename)]),
    new Text(' file was successfully uploaded.'),
  ]
}
