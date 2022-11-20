export class ToastKind {
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

export const defaultToastKinds = Object.freeze({
  info: new ToastKind('info', 'info-square-fill', 'Information'),
  warn: new ToastKind('warning', 'exclamation-triangle-fill', 'Warning'),
  error: new ToastKind('danger', 'x-octagon-fill', 'Error'),
})
