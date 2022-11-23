import { ProgressView } from './controllers/ProgressView.mjs'
import { showToast, withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'
import { ToastKind } from './components/ToastView.mjs'
import { Text, Tag } from './libs/markup.mjs'

export function initFileForm(fileListView) {
  const fileForm = document.querySelector('.file-form')
  const progressView = new ProgressView()
  fileForm.addEventListener('submit', async event => {
    await withErrorDisplaying(async () => {
      event.preventDefault()

      // `FormData` should be created before the form is disabled
      const formData = new FormData(fileForm)

      const fileFormControls = fileForm.elements['file-form-controls']
      fileFormControls.setAttribute('disabled', '')
      progressView.show()

      try {
        progressView.setProgress(0)
        const savedFileInfo = await api.saveFile(formData, ({ loaded, total }) => {
          progressView.setProgress(loaded / total)
        })

        fileListView.addFileInfo(savedFileInfo)
        showToast(ToastKind.info, formatSuccessMessage(fileForm))
      } finally {
        progressView.hide()
        fileFormControls.removeAttribute('disabled')
      }
    })
  })

  const totalDeleteButton = fileForm.elements['total-delete-button']
  totalDeleteButton.addEventListener('click', async () => {
    await withErrorDisplaying(async () => {
      await api.deleteFiles()
      fileListView.setFileInfos([])
    })
  })
}

function formatSuccessMessage(fileForm) {
  const fileInput = fileForm.elements.file
  return [
    new Text('The '),
    new Tag('code', [new Text(fileInput.files[0].name)]),
    new Text(' file was successfully uploaded.'),
  ]
}
