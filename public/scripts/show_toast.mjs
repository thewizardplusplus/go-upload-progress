import { Toast, defaultToastLifetimeInMs } from "./components/Toast.mjs";

let globalToastCount = 0;

export function showToast(
  toastKind,
  message,
  lifetimeInMs = defaultToastLifetimeInMs
) {
  const toastID = globalToastCount++;
  const toast = Toast({ id: toastID, toastKind, message, lifetimeInMs });

  const toastContainer = document.querySelector(".toast-container");
  toastContainer.appendChild(toast.toDOM());
}
