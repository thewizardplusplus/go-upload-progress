/**
 * @module controllers/FileListView
 */

import { FileInfo } from '../libs/api.mjs'
import { Tag, removeParentByChildID, removeAllChildren } from '../libs/markup.mjs'
import { NoFilesView, noFilesID } from '../components/NoFilesView.mjs'
import { FileCardView, makeFileCardID } from '../components/FileCardView.mjs'

/**
 * @typedef {import('../libs/markup.mjs').Node} Node
 */

/**
 * @callback FileDeletingHandler
 * @param {string} filename
 * @returns {void}
 */

function FileListItemView(/** @type {{ body: Node }} */ attributes) {
  // @ts-ignore
  return new Tag('li', [attributes.body])
}

/**
 * @class
 */
export class FileListView {
  /** @type {HTMLElement} */ #fileList
  /** @type {FileDeletingHandler} */ #onFileDeleting

  /**
   * @constructs
   * @param {FileDeletingHandler} onFileDeleting
   */
  constructor(onFileDeleting) {
    if (onFileDeleting === undefined) {
      throw new Error('file deleting handler is required')
    }

    // @ts-ignore
    this.#fileList = document.querySelector('.file-list')
    this.#onFileDeleting = onFileDeleting
  }

  /**
   * @method
   * @param {FileInfo} fileInfo
   * @returns {void}
   */
  addFileInfo(fileInfo) {
    removeParentByChildID(noFilesID)

    const fileListItemView = FileListItemView({ body: this.#makeFileCardView(fileInfo) })
    this.#fileList.insertBefore(fileListItemView.toDOM(), this.#fileList.firstChild)
  }

  /**
   * @method
   * @param {string} filename
   * @returns {void}
   */
  removeFileInfo(filename) {
    removeParentByChildID(makeFileCardID(filename))

    if (!this.#fileList.hasChildNodes()) {
      this.#appendNoFilesView()
    }
  }

  /**
   * @method
   * @param {Array.<FileInfo>} fileInfos
   * @returns {void}
   */
  setFileInfos(fileInfos) {
    removeAllChildren(this.#fileList)

    if (fileInfos.length === 0) {
      this.#appendNoFilesView()
      return
    }

    fileInfos.forEach(fileInfo => this.#appendFileListItemView(this.#makeFileCardView(fileInfo)))
  }

  #makeFileCardView(/** @type {FileInfo} */ fileInfo) {
    return FileCardView({ fileInfo, onFileDeleting: () => this.#onFileDeleting(fileInfo.name) })
  }

  #appendNoFilesView() {
    this.#appendFileListItemView(NoFilesView())
  }

  #appendFileListItemView(/** @type {Node} */ body) {
    const fileListItemView = FileListItemView({ body })
    this.#fileList.appendChild(fileListItemView.toDOM())
  }
}
