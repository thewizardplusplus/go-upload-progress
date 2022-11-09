function InitializeDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async () => {
      await deleteFile(deleteButton.dataset.filename);
      await UpdateFileList();
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const totalDeleteButton = document.querySelector(".total-delete-button");
  totalDeleteButton.addEventListener("click", async () => {
    await deleteFiles();
    await UpdateFileList();
  });
});
