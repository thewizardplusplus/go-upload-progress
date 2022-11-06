function InitializeDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async () => {
      const params = new URLSearchParams({
        filename: deleteButton.dataset.filename,
      });
      await fetch("/api/v1/files?" + params.toString(), { method: "DELETE" });

      UpdateFileList();
    });
  });
}
