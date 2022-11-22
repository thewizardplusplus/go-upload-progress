import { ToastKind, ToastView, defaultToastLifetimeInMs } from './components/ToastView.mjs'
import { capitalizeFirstLetter } from './libs/markup.mjs'

let globalToastCount = 0

export function showToast(kind, body, lifetimeInMs = defaultToastLifetimeInMs) {
  const toastID = globalToastCount++
  const toastView = ToastView({ id: toastID, kind, body, lifetimeInMs })

  const toastContainer = document.querySelector('.toast-container')
  toastContainer.appendChild(toastView.toDOM())
}

export async function withErrorDisplaying(baseHandler) {
  try {
    await baseHandler()
  } catch (err) {
    showToast(ToastKind.error, formatErrMessage(err.message))
  }
}

function formatErrMessage(errMessage) {
  const trimmedErrMessage = errMessage.trim()
  return capitalizeFirstLetter(trimmedErrMessage) + (!trimmedErrMessage.endsWith('.') ? '.' : '')
}
