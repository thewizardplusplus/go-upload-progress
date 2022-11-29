/**
 * @module show_toast
 */

import { ToastKind } from './components/ToastKind.mjs'
import { ToastView, defaultToastLifetimeInMs } from './components/ToastView.mjs'
import { Node, capitalizeFirstLetter } from './libs/markup.mjs'

/**
 * @callback BaseHandler
 * @async
 * @returns {Promise.<void>}
 */

let globalToastCount = 0

/**
 * @function
 * @param {ToastKind} kind
 * @param {string|Node|Array.<Node>} body
 * @param {number} [lifetimeInMs=defaultToastLifetimeInMs]
 * @returns {void}
 */
export function showToast(kind, body, lifetimeInMs = defaultToastLifetimeInMs) {
  const toastID = globalToastCount++
  const toastView = ToastView({ id: toastID, kind, body, lifetimeInMs })

  const toastContainer = document.querySelector('.toast-container')
  // @ts-ignore
  toastContainer.appendChild(toastView.toDOM())
}

/**
 * @function
 * @async
 * @param {BaseHandler} baseHandler
 * @returns {Promise.<void>}
 */
export async function withErrorDisplaying(baseHandler) {
  try {
    await baseHandler()
  } catch (err) {
    // @ts-ignore
    showToast(ToastKind.error, formatErrMessage(err.message))
  }
}

function formatErrMessage(/** @type {string} */ errMessage) {
  const trimmedErrMessage = errMessage.trim()
  return capitalizeFirstLetter(trimmedErrMessage) + (!trimmedErrMessage.endsWith('.') ? '.' : '')
}
