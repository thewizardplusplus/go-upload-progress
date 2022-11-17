import { withErrorDisplaying } from "./show_toast.mjs";
import * as api from "./libs/api.mjs";
import { showToast } from "./show_toast.mjs";
import { defaultToastKinds } from "./components/ToastKind.mjs";
import { Text, Tag } from "./libs/markup.mjs";
import { updateFileList } from "./update_file_list.mjs";

export function initFileForm() {
  const fileForm = document.querySelector(".file-form");
  fileForm.addEventListener("submit", async (event) => {
    await withErrorDisplaying(async () => {
      event.preventDefault();

      const fileInput = fileForm.elements.file;
      await api.saveFile(new FormData(fileForm));
      showToast(defaultToastKinds.info, [
        new Text("The "),
        new Tag("code", [new Text(fileInput.files[0].name)]),
        new Text(" file was successfully uploaded."),
      ]);

      await updateFileList();
    });
  });

  const totalDeleteButton = document.querySelector(".total-delete-button");
  totalDeleteButton.addEventListener("click", async () => {
    await withErrorDisplaying(async () => {
      await api.deleteFiles();
      await updateFileList();
    });
  });
}
