import { ProgressView } from "./components/ProgressView.mjs";
import { withErrorDisplaying } from "./show_toast.mjs";
import * as api from "./libs/api.mjs";
import { showToast } from "./show_toast.mjs";
import { defaultToastKinds } from "./components/ToastKind.mjs";
import { Text, Tag } from "./libs/markup.mjs";
import { updateFileList } from "./update_file_list.mjs";

export function initFileForm() {
  const progressView = new ProgressView();
  const fileForm = document.querySelector(".file-form");
  fileForm.addEventListener("submit", async (event) => {
    await withErrorDisplaying(async () => {
      event.preventDefault();

      const formData = new FormData(fileForm);
      const allControls = fileForm.elements["all-controls"];
      allControls.setAttribute("disabled", "");
      progressView.show();

      try {
        progressView.setProgress(0);
        await api.saveFile(formData, ({ loaded, total }) => {
          progressView.setProgress(loaded / total);
        });
      } finally {
        progressView.hide();
        allControls.removeAttribute("disabled");
      }

      const fileInput = fileForm.elements.file;
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
