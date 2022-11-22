const fileAPIRoute = '/api/v1/files'

export async function getFiles() {
  const response = await fetch(fileAPIRoute)
  await throwOnUnsuccessfulResponse(response)

  return await response.json()
}

export async function saveFile(formData, progressEventHandler) {
  return new Promise((resolve, reject) => {
    const rejectWithError = errMessage => {
      reject(new Error(errMessage))
    }

    const request = new XMLHttpRequest()
    request.addEventListener('load', () => {
      if (request.status < 200 || request.status > 299) {
        rejectWithError(request.responseText)
        return
      }

      resolve(request.response)
    })
    request.addEventListener('error', () => {
      rejectWithError('network error')
    })

    if (progressEventHandler !== undefined) {
      request.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          progressEventHandler({ loaded: event.loaded, total: event.total })
        }
      })
    }

    request.open('POST', fileAPIRoute)
    request.responseType = 'json'
    request.send(formData)
  })
}

export async function deleteFile(filename) {
  const params = new URLSearchParams({ filename })
  const response = await fetch(`${fileAPIRoute}?${params}`, {
    method: 'DELETE',
  })
  await throwOnUnsuccessfulResponse(response)
}

export async function deleteFiles() {
  const response = await fetch(fileAPIRoute, { method: 'DELETE' })
  await throwOnUnsuccessfulResponse(response)
}

async function throwOnUnsuccessfulResponse(response) {
  if (response.ok) {
    return
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}
