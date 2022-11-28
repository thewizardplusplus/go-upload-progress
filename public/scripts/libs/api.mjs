/**
 * @module libs/api
 */

const fileAPIRoute = '/api/v1/files'

/**
 * @typedef {Object} RawFileInfo
 * @property {string} Name
 * @property {number} SizeInB
 * @property {string} ModificationTime In RFC 3339 format, e.g. "2006-01-02T15:04:05.123456789+03:00".
 */

/**
 * @class
 */
export class FileInfo {
  /** @type {string} */ #name
  /** @type {number} */ #sizeInB
  /** @type {string} */ #modificationTime

  /**
   * @constructs
   * @param {RawFileInfo} rawFileInfo
   */
  constructor(rawFileInfo) {
    if (rawFileInfo.Name === undefined) {
      throw new Error('file name is required')
    }
    if (rawFileInfo.SizeInB === undefined) {
      throw new Error('file size is required')
    }
    if (rawFileInfo.ModificationTime === undefined) {
      throw new Error('file modification time is required')
    }

    this.#name = rawFileInfo.Name
    this.#sizeInB = rawFileInfo.SizeInB
    this.#modificationTime = rawFileInfo.ModificationTime
  }

  /**
   * @readonly
   * @type {string}
   */
  get name() {
    return this.#name
  }

  /**
   * @readonly
   * @type {number}
   */
  get sizeInB() {
    return this.#sizeInB
  }

  /**
   * @readonly
   * @type {string}
   * @description In RFC 3339 format, e.g. "2006-01-02T15:04:05.123456789+03:00".
   */
  get modificationTime() {
    return this.#modificationTime
  }
}

/**
 * @typedef {Object} ProgressEventHandlerParams
 * @property {number} loaded
 * @property {number} total
 */

/**
 * @callback ProgressEventHandler
 * @param {ProgressEventHandlerParams} params
 * @returns {void}
 */

/**
 * @function
 * @async
 * @returns {Promise.<Array.<FileInfo>>}
 */
export async function getFiles() {
  const response = await fetch(fileAPIRoute)
  await throwOnUnsuccessfulResponse(response)

  const rawFileInfos = await response.json()
  return rawFileInfos.map((/** @type {RawFileInfo} */ rawFileInfo) => new FileInfo(rawFileInfo))
}

/**
 * @function
 * @async
 * @param {FormData} formData
 * @param {ProgressEventHandler} [progressEventHandler]
 * @returns {Promise.<FileInfo>}
 */
export async function saveFile(formData, progressEventHandler) {
  return new Promise((resolve, reject) => {
    const rejectWithError = (/** @type {string} */ errMessage) => {
      reject(new Error(errMessage))
    }

    const request = new XMLHttpRequest()
    request.addEventListener('load', () => {
      if (request.status < 200 || request.status > 299) {
        rejectWithError(request.responseText)
        return
      }

      resolve(new FileInfo(request.response))
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

/**
 * @function
 * @async
 * @param {string} filename
 * @returns {Promise.<void>}
 */
export async function deleteFile(filename) {
  const params = new URLSearchParams({ filename })
  const response = await fetch(`${fileAPIRoute}?${params}`, { method: 'DELETE' })
  await throwOnUnsuccessfulResponse(response)
}

/**
 * @function
 * @async
 * @returns {Promise.<void>}
 */
export async function deleteFiles() {
  const response = await fetch(fileAPIRoute, { method: 'DELETE' })
  await throwOnUnsuccessfulResponse(response)
}

async function throwOnUnsuccessfulResponse(/** @type {Response} */ response) {
  if (response.ok) {
    return
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}
