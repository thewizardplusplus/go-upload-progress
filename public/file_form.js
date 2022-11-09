window.addEventListener("DOMContentLoaded", () => {
  const fileForm = document.querySelector(".file-form");
  fileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    await saveFile(new FormData(fileForm));
    await UpdateFileList();
  });

  const totalDeleteButton = document.querySelector(".total-delete-button");
  totalDeleteButton.addEventListener("click", async () => {
    await deleteFiles();
    await UpdateFileList();
  });
});
