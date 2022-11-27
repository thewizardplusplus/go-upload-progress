/**
 * @module update_file_list
 */

import { withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'

/**
 * @typedef {import('./controllers/FileListView.mjs').FileListView} FileListView
 */

const defaultFileListUpdatingTimeout = 1000

/**
 * @function
 * @async
 * @param {FileListView} fileListView
 * @returns {Promise.<void>}
 */
export async function updateFileList(fileListView) {
  await withErrorDisplaying(async () => {
    const fileInfos = await api.getFiles()
    fileListView.setFileInfos(fileInfos)
  })
}

/**
 * @function
 * @async
 * @param {FileListView} fileListView
 * @returns {Promise.<void>}
 */
export async function startFileListUpdating(fileListView) {
  while (true) {
    const startUnixTimeInMs = getCurrentUnixTimeInMs()
    await updateFileList(fileListView)

    const elapsedTimeInMs = getCurrentUnixTimeInMs() - startUnixTimeInMs
    const fileListUpdatingTimeout = Math.max(0, defaultFileListUpdatingTimeout - elapsedTimeInMs)
    await new Promise(resolve => setTimeout(resolve, fileListUpdatingTimeout))
  }
}

function getCurrentUnixTimeInMs() {
  return new Date().getTime()
}
