/**
 * @module load_file_list
 */

import { FileListView } from './controllers/FileListView.mjs'
import { withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'

/**
 * @function
 * @async
 * @param {FileListView} fileListView
 * @returns {Promise.<void>}
 */
export async function loadFileList(fileListView) {
  await withErrorDisplaying(async () => {
    const fileInfos = await api.getFiles()
    fileListView.setFileInfos(fileInfos)
  })
}
