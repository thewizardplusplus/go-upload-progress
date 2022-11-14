import * as api from "./libs/api.mjs";
import { updateFileList } from "./update_file_list.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const fileForm = document.querySelector(".file-form");
  fileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await api.saveFile(new FormData(fileForm));
    await updateFileList();
  });

  const totalDeleteButton = document.querySelector(".total-delete-button");
  totalDeleteButton.addEventListener("click", async () => {
    await api.deleteFiles();
    await updateFileList();
  });
});
