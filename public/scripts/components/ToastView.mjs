/**
 * @module components/ToastView
 */

import { ToastKind } from './ToastKind.mjs'
import { Node, Tag, transformToChildren, removeElementByID } from '../libs/markup.mjs'
import { ToastHeaderView } from './ToastHeaderView.mjs'

/**
 * @constant
 * @type {number}
 */
export const immortalToastLifetimeInMs = 0

/**
 * @constant
 * @type {number}
 */
export const defaultToastLifetimeInMs = 2000

/**
 * @typedef {Object} ToastViewAttributes
 * @property {number} id
 * @property {ToastKind} kind
 * @property {string|Node|Array.<Node>} body
 * @property {number} [lifetimeInMs]
 */

/**
 * @function
 * @param {ToastViewAttributes} attributes
 * @returns {Tag}
 */
export function ToastView(attributes) {
  attributes = { lifetimeInMs: defaultToastLifetimeInMs, ...attributes }

  const toastID = `toast-${attributes.id}`
  const removalTimeoutID = setToastRemovalTimeout(toastID, attributes.lifetimeInMs)

  const borderColorStyleClass = 'border-' + attributes.kind.colorStyle
  return new Tag('div', { id: toastID, class: `toast ${borderColorStyleClass} show` }, [
    ToastHeaderView({
      kind: attributes.kind,
      onToastClosing: () => {
        clearTimeout(removalTimeoutID)
        removeElementByID(toastID)
      },
    }),
    new Tag('div', { class: 'toast-body' }, transformToChildren(attributes.body)),
  ])
}

function setToastRemovalTimeout(
  /** @type {string} */ toastID,
  /** @type {number|undefined} */ toastLifetimeInMs,
) {
  if (toastLifetimeInMs === immortalToastLifetimeInMs) {
    return undefined // `clearTimeout()` will ignore it
  }

  return setTimeout(() => removeElementByID(toastID), toastLifetimeInMs)
}
