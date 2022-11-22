import { ProgressView } from './components/ProgressView.mjs'
import { showToast, withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'
import { ToastKind } from './components/ToastView.mjs'
import { Text, Tag } from './libs/markup.mjs'
import { noFilesID } from './components/NoFilesView.mjs'
import { FileCardView } from './components/FileCardView.mjs'
import { updateFileList } from './update_file_list.mjs'

export function initFileForm() {
  const fileForm = document.querySelector('.file-form')
  const fileFormControls = fileForm.elements['file-form-controls']
  const fileInput = fileForm.elements.file
  const totalDeleteButton = fileForm.elements['total-delete-button']

  const progressView = new ProgressView()
  const fileListView = document.querySelector('.file-list')
  fileForm.addEventListener('submit', async event => {
    await withErrorDisplaying(async () => {
      event.preventDefault()

      // `FormData` should be created before the form is disabled
      const formData = new FormData(fileForm)

      fileFormControls.setAttribute('disabled', '')
      progressView.show()

      try {
        progressView.setProgress(0)
        const savedFileInfo = await api.saveFile(formData, ({ loaded, total }) => {
          progressView.setProgress(loaded / total)
        })

        showToast(ToastKind.info, [
          new Text('The '),
          new Tag('code', [new Text(fileInput.files[0].name)]),
          new Text(' file was successfully uploaded.'),
        ])

        const noFilesView = document.getElementById(noFilesID)
        if (noFilesView !== null) {
          noFilesView.parentElement.remove()
        }

        const fileListItemView = new Tag('li', [
          FileCardView({
            fileInfo: savedFileInfo,
            onFileDeleting: async () => {
              await withErrorDisplaying(async () => {
                await api.deleteFile(savedFileInfo.Name)
                await updateFileList()
              })
            },
          }),
        ])
        fileListView.insertBefore(fileListItemView.toDOM(), fileListView.firstChild)
      } finally {
        progressView.hide()
        fileFormControls.removeAttribute('disabled')
      }
    })
  })

  totalDeleteButton.addEventListener('click', async () => {
    await withErrorDisplaying(async () => {
      await api.deleteFiles()
      await updateFileList()
    })
  })
}
