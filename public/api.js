async function getFiles() {
  const response = await fetch("/api/v1/files");
  return await response.json();
}

async function saveFile(formData) {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.addEventListener("load", () => {
      if (request.status == 201) {
        resolve();
      }
    });

    request.open("POST", "/api/v1/files");
    request.send(formData);
  });
}

async function deleteFile(filename) {
  const params = new URLSearchParams({ filename });
  await fetch("/api/v1/files?" + params.toString(), { method: "DELETE" });
}

async function deleteFiles() {
  await fetch("/api/v1/files", { method: "DELETE" });
}
