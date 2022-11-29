/**
 * @module components/ToastView
 */

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
 * @class
 */
export class ToastKind {
  /**
   * @static
   * @readonly
   * @type {ToastKind}
   */
  static get info() {
    return new ToastKind('info', 'info-square-fill', 'information')
  }

  /**
   * @static
   * @readonly
   * @type {ToastKind}
   */
  static get warn() {
    return new ToastKind('warning', 'exclamation-triangle-fill', 'warning')
  }

  /**
   * @static
   * @readonly
   * @type {ToastKind}
   */
  static get error() {
    return new ToastKind('danger', 'x-octagon-fill', 'error')
  }

  /** @type {string} */ #colorStyle
  /** @type {string} */ #iconName
  /** @type {string} */ #title

  constructor(
    /** @type {string} */ colorStyle,
    /** @type {string} */ iconName,
    /** @type {string} */ title,
  ) {
    if (colorStyle === undefined) {
      throw new Error('toast color style is required')
    }
    if (iconName === undefined) {
      throw new Error('toast icon name is required')
    }
    if (title === undefined) {
      throw new Error('toast title is required')
    }

    this.#colorStyle = colorStyle
    this.#iconName = iconName
    this.#title = title
  }

  /**
   * @readonly
   * @type {string}
   */
  get colorStyle() {
    return this.#colorStyle
  }

  /**
   * @readonly
   * @type {string}
   */
  get iconName() {
    return this.#iconName
  }

  /**
   * @readonly
   * @type {string}
   */
  get title() {
    return this.#title
  }
}

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
