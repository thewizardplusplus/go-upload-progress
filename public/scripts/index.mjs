import { FileListView } from './controllers/FileListView.mjs'
import { withErrorDisplaying } from './show_toast.mjs'
import * as api from './libs/api.mjs'
import { initFileForm } from './init_file_form.mjs'
import { loadFileList } from './load_file_list.mjs'

window.addEventListener('DOMContentLoaded', async () => {
  const fileListView = new FileListView(async filename => {
    await withErrorDisplaying(async () => {
      await api.deleteFile(filename)
      fileListView.removeFileInfo(filename)
    })
  })

  initFileForm(fileListView)
  await loadFileList(fileListView)
})
