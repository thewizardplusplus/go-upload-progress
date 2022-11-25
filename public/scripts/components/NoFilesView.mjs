/**
 * @module components/NoFilesView
 */

import { Tag } from '../libs/markup.mjs'
import { IconWithTextViews } from './IconWithTextViews.mjs'

/**
 * @constant
 * @type {string}
 */
export const noFilesID = 'no-files'

/**
 * @function
 * @returns {Tag}
 */
export function NoFilesView() {
  return new Tag('p', { id: noFilesID, class: 'text-muted' }, [
    ...IconWithTextViews({ iconName: 'file-earmark-x', text: 'No files' }),
  ])
}
