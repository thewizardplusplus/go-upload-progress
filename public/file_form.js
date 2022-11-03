window.addEventListener("DOMContentLoaded", () => {
  const fileForm = document.querySelector(".file-form");
  fileForm.addEventListener("submit", (event) => {
    const request = new XMLHttpRequest();
    request.addEventListener("load", () => {
      if (request.status == 201) {
        UpdateFileList();
      }
    });

    request.open("POST", "/api/v1/files");
    request.send(new FormData(fileForm));

    event.preventDefault();
  });
});
