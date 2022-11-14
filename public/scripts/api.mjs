const fileAPIRoute = "/api/v1/files";

export async function getFiles() {
  const response = await fetch(fileAPIRoute);
  return await response.json();
}

export async function saveFile(formData) {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.addEventListener("load", () => {
      if (request.status == 201) {
        resolve();
      }
    });

    request.open("POST", fileAPIRoute);
    request.send(formData);
  });
}

export async function deleteFile(filename) {
  const params = new URLSearchParams({ filename });
  await fetch(`${fileAPIRoute}?${params}`, { method: "DELETE" });
}

export async function deleteFiles() {
  await fetch(fileAPIRoute, { method: "DELETE" });
}
