import { Text, Tag, removeElementByID, capitalizeFirstLetter } from '../libs/markup.mjs'
import { IconView } from './IconView.mjs'

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

  const textColorStyleClass = 'text-' + attributes.kind.colorStyle
  const borderColorStyleClass = 'border-' + attributes.kind.colorStyle

  const toastID = `toast-${attributes.id}`
  const removalTimeoutID = setToastRemovalTimeout(toastID, attributes.lifetimeInMs)

  return new Tag('div', { id: toastID, class: `toast ${borderColorStyleClass} show` }, [
    new Tag('div', { class: `toast-header ${borderColorStyleClass}` }, [
      IconView({
        iconName: attributes.kind.iconName,
        colorStyle: attributes.kind.colorStyle,
      }),
      Text.nonBreakingSpace,
      new Tag('strong', { class: `${textColorStyleClass} flex-grow-1` }, [
        new Text(capitalizeFirstLetter(attributes.kind.title)),
      ]),
      new Tag('button', {
        class: 'btn-close',
        type: 'button',
        onclick: () => {
          clearTimeout(removalTimeoutID)
          removeElementByID(toastID)
        },
      }),
    ]),
    new Tag('div', { class: 'toast-body' }, wrapToastBody(attributes.body)),
  ])
}

function setToastRemovalTimeout(toastID, toastLifetimeInMs) {
  if (toastLifetimeInMs === immortalToastLifetimeInMs) {
    return undefined // `clearTimeout()` will ignore it
  }

  return setTimeout(() => removeElementByID(toastID), toastLifetimeInMs)
}

function wrapToastBody(body) {
  if (typeof body === 'string' || body instanceof String) {
    return [new Text(body)]
  }

  if (!Array.isArray(body)) {
    return [body]
  }

  return body
}
