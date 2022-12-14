/**
 * @module components/FileCardView
 */

import { FileInfo } from '../libs/api.mjs'
import { Tag } from '../libs/markup.mjs'
import { FileInfoView } from './FileInfoView.mjs'
import { IconView } from './IconView.mjs'

const disabledIDCharacters = /[^A-Za-z\d]+/g

/**
 * @function
 * @param {string} filename
 * @returns {string}
 */
export function makeFileCardID(filename) {
  return `file-card-${filename.replaceAll(disabledIDCharacters, '-')}`
}

/**
 * @callback EventHandler
 * @param {Event} event
 * @returns {void}
 */

/**
 * @typedef {Object} FileCardViewAttributes
 * @property {FileInfo} fileInfo
 * @property {EventHandler} onFileDeleting
 */

/**
 * @function
 * @param {FileCardViewAttributes} attributes
 * @returns {Tag}
 */
export function FileCardView(attributes) {
  const fileCardID = makeFileCardID(attributes.fileInfo.name)
  return new Tag('div', { id: fileCardID, class: 'card mb-3' }, [
    new Tag('div', { class: 'card-body d-flex' }, [
      FileInfoView({ additionalClasses: 'flex-grow-1 me-3', fileInfo: attributes.fileInfo }),
      new Tag(
        'button',
        { class: 'btn btn-outline-secondary align-self-start', onclick: attributes.onFileDeleting },
        [IconView({ name: 'trash' })],
      ),
    ]),
  ])
}
