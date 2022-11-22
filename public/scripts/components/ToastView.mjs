import { Tag, transformToChildren, removeElementByID } from '../libs/markup.mjs'
import { ToastHeaderView } from './ToastHeaderView.mjs'

export const immortalToastLifetimeInMs = 0
export const defaultToastLifetimeInMs = 2000

export class ToastKind {
  static get info() {
    return new ToastKind('info', 'info-square-fill', 'information')
  }

  static get warn() {
    return new ToastKind('warning', 'exclamation-triangle-fill', 'warning')
  }

  static get error() {
    return new ToastKind('danger', 'x-octagon-fill', 'error')
  }

  #colorStyle
  #iconName
  #title

  constructor(colorStyle, iconName, title) {
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

  get colorStyle() {
    return this.#colorStyle
  }

  get iconName() {
    return this.#iconName
  }

  get title() {
    return this.#title
  }
}

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

function setToastRemovalTimeout(toastID, toastLifetimeInMs) {
  if (toastLifetimeInMs === immortalToastLifetimeInMs) {
    return undefined // `clearTimeout()` will ignore it
  }

  return setTimeout(() => removeElementByID(toastID), toastLifetimeInMs)
}
