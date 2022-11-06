function InitializeDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      DeleteFile(deleteButton.dataset.filename);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const totalDeleteButton = document.querySelector(".total-delete-button");
  totalDeleteButton.addEventListener("click", () => {
    DeleteFile();
  });
});

async function DeleteFile(filename) {
  const params = new URLSearchParams(
    filename !== undefined ? { filename } : {}
  );
  await fetch("/api/v1/files?" + params.toString(), { method: "DELETE" });

  UpdateFileList();
}
