export class ToastKind {
  #colorStyle
  #icon
  #title

  constructor(colorStyle, icon, title) {
    if (colorStyle === undefined) {
      throw new Error('toast color style is required')
    }
    if (icon === undefined) {
      throw new Error('toast icon is required')
    }
    if (title === undefined) {
      throw new Error('toast title is required')
    }

    this.#colorStyle = colorStyle
    this.#icon = icon
    this.#title = title
  }

  get colorStyle() {
    return this.#colorStyle
  }

  get icon() {
    return this.#icon
  }

  get title() {
    return this.#title
  }
}

export const defaultToastKinds = Object.freeze({
  info: new ToastKind('info', 'bi-info-square-fill', 'Information'),
  warn: new ToastKind('warning', 'bi-exclamation-triangle-fill', 'Warning'),
  error: new ToastKind('danger', 'bi-x-octagon-fill', 'Error'),
})
