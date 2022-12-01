import { FileListView } from './controllers/FileListView.mjs'
import { deleteFile } from './delete_file.mjs'
import { initFileForm } from './init_file_form.mjs'
import { loadFileList } from './load_file_list.mjs'

window.addEventListener('DOMContentLoaded', async () => {
  const fileListView = new FileListView(async filename => {
    await deleteFile(fileListView, filename)
  })

  initFileForm(fileListView)
  await loadFileList(fileListView)
})
