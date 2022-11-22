import { withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'
import { Tag, removeParentByChildID, removeAllChildren } from './libs/markup.mjs'
import { NoFilesView } from './components/NoFilesView.mjs'
import { FileCardView } from './components/FileCardView.mjs'

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
        FileCardView({
          fileInfo,
          onFileDeleting: async fileCardID => {
            await withErrorDisplaying(async () => {
              await api.deleteFile(fileInfo.Name)

              removeParentByChildID(fileCardID)
              if (!fileListView.hasChildNodes()) {
                const fileListItemView = new Tag('li', [NoFilesView()])
                fileListView.appendChild(fileListItemView.toDOM())
              }
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
