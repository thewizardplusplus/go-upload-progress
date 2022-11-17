const fileAPIRoute = "/api/v1/files";

export async function getFiles() {
  const response = await fetch(fileAPIRoute);
  await checkResponse(response);

  return await response.json();
}

export async function saveFile(formData) {
  return new Promise((resolve, reject) => {
    const rejectWithError = (errMessage) => {
      reject(new Error(errMessage));
    };

    const request = new XMLHttpRequest();
    request.addEventListener("load", () => {
      if (request.status < 200 || request.status > 299) {
        rejectWithError(request.responseText);
        return;
      }

      resolve();
    });
    request.addEventListener("error", () => {
      rejectWithError("network error");
    });

    request.open("POST", fileAPIRoute);
    request.send(formData);
  });
}

export async function deleteFile(filename) {
  const params = new URLSearchParams({ filename });
  const response = await fetch(`${fileAPIRoute}?${params}`, {
    method: "DELETE",
  });
  await checkResponse(response);
}

export async function deleteFiles() {
  const response = await fetch(fileAPIRoute, { method: "DELETE" });
  await checkResponse(response);
}

async function checkResponse(response) {
  if (response.ok) {
    return;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
}
