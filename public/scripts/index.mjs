import { initFileForm } from './init_file_form.mjs'
import { startFileListUpdating } from './update_file_list.mjs'

window.addEventListener('DOMContentLoaded', async () => {
  initFileForm()
  await startFileListUpdating()
})
