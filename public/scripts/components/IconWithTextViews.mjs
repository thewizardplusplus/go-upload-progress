/**
 * @module components/IconWithTextViews
 */

import { Node, Text, transformToChildren } from '../libs/markup.mjs'
import { IconView } from './IconView.mjs'

/**
 * @typedef {Object} IconWithTextViewsAttributes
 * @property {string} iconName
 * @property {string} [iconColorStyle]
 * @property {string|Node|Array.<Node>} text
 */

/**
 * @function
 * @param {IconWithTextViewsAttributes} attributes
 * @returns {Array.<Node>}
 */
export function IconWithTextViews(attributes) {
  return [
    IconView({ name: attributes.iconName, colorStyle: attributes.iconColorStyle }),
    Text.nonBreakingSpace,
    ...transformToChildren(attributes.text),
  ]
}
