/**
 * @module components/ToastKind
 */

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
