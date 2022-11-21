import { withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'
import { Tag, removeAllChildren } from './libs/markup.mjs'
import { NoFilesView } from './components/NoFilesView.mjs'
import { FileInfoView } from './components/FileInfoView.mjs'

const defaultFileListUpdatingTimeout = 1000

export async function updateFileList() {
  await withErrorDisplaying(async () => {
    const fileInfos = await api.getFiles()

    const fileListView = document.querySelector('.file-list')
    removeAllChildren(fileListView)

    if (fileInfos.length === 0) {
      const fileListItemView = new Tag('li', [NoFilesView()])
      fileListView.appendChild(fileListItemView.toDOM())

      return
    }

    fileInfos.forEach(fileInfo => {
      const fileListItemView = new Tag('li', [
        FileInfoView({
          fileInfo,
          onFileDeleting: async () => {
            await withErrorDisplaying(async () => {
              await api.deleteFile(fileInfo.Name)
              await updateFileList()
            })
          },
        }),
      ])
      fileListView.appendChild(fileListItemView.toDOM())
    })
  })
}

export async function startFileListUpdating() {
  while (true) {
    const startUnixTimeInMs = getCurrentUnixTimeInMs()
    await updateFileList()

    const elapsedTimeInMs = getCurrentUnixTimeInMs() - startUnixTimeInMs
    const fileListUpdatingTimeout = Math.max(0, defaultFileListUpdatingTimeout - elapsedTimeInMs)
    await new Promise(resolve => setTimeout(resolve, fileListUpdatingTimeout))
  }
}

function getCurrentUnixTimeInMs() {
  return new Date().getTime()
}
