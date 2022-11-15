import { Toast, defaultToastLifetimeInMs } from "./components/Toast.mjs";

let globalToastCount = 0;

export function showToast(kind, body, lifetimeInMs = defaultToastLifetimeInMs) {
  const id = globalToastCount++;
  const toast = Toast({ id, kind, body, lifetimeInMs });

  const toastContainer = document.querySelector(".toast-container");
  toastContainer.appendChild(toast.toDOM());
}
