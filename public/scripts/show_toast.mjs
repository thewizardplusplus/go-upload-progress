import { Toast, defaultToastLifetimeInMs } from './components/Toast.mjs'
import { capitalizeFirstLetter } from './libs/markup.mjs'
import { defaultToastKinds } from './components/ToastKind.mjs'

let globalToastCount = 0

export function showToast(kind, body, lifetimeInMs = defaultToastLifetimeInMs) {
  const id = globalToastCount++
  const toast = Toast({ id, kind, body, lifetimeInMs })

  const toastContainer = document.querySelector('.toast-container')
  toastContainer.appendChild(toast.toDOM())
}

export async function withErrorDisplaying(baseHandler) {
  try {
    await baseHandler()
  } catch (err) {
    const trimmedErrMessage = err.message.trim()
    const errMessageAsSentence =
      capitalizeFirstLetter(trimmedErrMessage) +
      (!trimmedErrMessage.endsWith('.') ? '.' : '')
    showToast(defaultToastKinds.error, errMessageAsSentence)
  }
}
