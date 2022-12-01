/**
 * @module delete_file
 */

import { FileListView } from './controllers/FileListView.mjs'
import { withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'

/**
 * @function
 * @async
 * @param {FileListView} fileListView
 * @param {string} filename
 * @returns {Promise.<void>}
 */
export async function deleteFile(fileListView, filename) {
  await withErrorDisplaying(async () => {
    await api.deleteFile(filename)
    fileListView.removeFileInfo(filename)
  })
}
