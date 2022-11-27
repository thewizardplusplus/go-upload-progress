/**
 * @module init_file_form
 */

import { ProgressView } from './controllers/ProgressView.mjs'
import { showToast, withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'
import { ToastKind } from './components/ToastView.mjs'
import { Text, Tag } from './libs/markup.mjs'

/**
 * @typedef {import('./controllers/FileListView.mjs').FileListView} FileListView
 */

/**
 * @function
 * @param {FileListView} fileListView
 * @returns {void}
 */
export function initFileForm(fileListView) {
  const fileForm = document.querySelector('.file-form')
  const progressView = new ProgressView()
  // @ts-ignore
  fileForm.addEventListener('submit', async event => {
    await withErrorDisplaying(async () => {
      event.preventDefault()

      // `FormData` should be created before the form is disabled
      // @ts-ignore
      const formData = new FormData(fileForm)

      // @ts-ignore
      const fileFormControls = fileForm.elements['file-form-controls']
      fileFormControls.setAttribute('disabled', '')
      progressView.show()

      try {
        progressView.setProgress(0)
        const savedFileInfo = await api.saveFile(formData, ({ loaded, total }) => {
          progressView.setProgress(loaded / total)
        })

        fileListView.addFileInfo(savedFileInfo)
        // @ts-ignore
        showToast(ToastKind.info, formatSuccessMessage(fileForm))
      } finally {
        progressView.hide()
        fileFormControls.removeAttribute('disabled')
      }
    })
  })

  // @ts-ignore
  const totalDeleteButton = fileForm.elements['total-delete-button']
  totalDeleteButton.addEventListener('click', async () => {
    await withErrorDisplaying(async () => {
      await api.deleteFiles()
      fileListView.setFileInfos([])
    })
  })
}

function formatSuccessMessage(/** @type {HTMLFormElement} */ fileForm) {
  // @ts-ignore
  const fileInput = fileForm.elements.file
  return [
    new Text('The '),
    // @ts-ignore
    new Tag('code', [new Text(fileInput.files[0].name)]),
    new Text(' file was successfully uploaded.'),
  ]
}
