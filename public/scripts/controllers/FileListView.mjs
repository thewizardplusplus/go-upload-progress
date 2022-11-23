import { Tag, removeParentByChildID, removeAllChildren } from '../libs/markup.mjs'
import { NoFilesView, noFilesID } from '../components/NoFilesView.mjs'
import { FileCardView, makeFileCardID } from '../components/FileCardView.mjs'

function FileListItemView(attributes) {
  return new Tag('li', [attributes.body])
}

export class FileListView {
  #fileList
  #onFileDeleting

  constructor(onFileDeleting) {
    if (onFileDeleting === undefined) {
      throw new Error('file deleting handler is required')
    }

    this.#fileList = document.querySelector('.file-list')
    this.#onFileDeleting = onFileDeleting
  }

  addFileInfo(fileInfo) {
    removeParentByChildID(noFilesID)

    const fileListItemView = FileListItemView({ body: this.#makeFileCardView(fileInfo) })
    this.#fileList.insertBefore(fileListItemView.toDOM(), this.#fileList.firstChild)
  }

  removeFileInfo(filename) {
    removeParentByChildID(makeFileCardID(filename))

    if (!this.#fileList.hasChildNodes()) {
      this.#appendNoFilesView()
    }
  }

  setFileInfos(fileInfos) {
    removeAllChildren(this.#fileList)

    if (fileInfos.length === 0) {
      this.#appendNoFilesView()
      return
    }

    fileInfos.forEach(fileInfo => this.#appendFileListItemView(this.#makeFileCardView(fileInfo)))
  }

  #makeFileCardView(fileInfo) {
    return FileCardView({ fileInfo, onFileDeleting: () => this.#onFileDeleting(fileInfo.Name) })
  }

  #appendNoFilesView() {
    this.#appendFileListItemView(NoFilesView())
  }

  #appendFileListItemView(body) {
    const fileListItemView = FileListItemView({ body })
    this.#fileList.appendChild(fileListItemView.toDOM())
  }
}
