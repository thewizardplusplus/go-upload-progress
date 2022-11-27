/**
 * @module controllers/ProgressView
 */

const showingClass = 'd-block'
const hidingClass = 'd-none'

/**
 * @class
 */
export class ProgressView {
  /** @type {HTMLElement} */ #container
  /** @type {HTMLElement} */ #bar

  /**
   * @constructs
   */
  constructor() {
    // @ts-ignore
    this.#container = document.querySelector('.progress-container')
    // @ts-ignore
    this.#bar = document.querySelector('.progress-bar')
  }

  /**
   * @method
   * @returns {void}
   */
  show() {
    this.#container.classList.replace(hidingClass, showingClass)
  }

  /**
   * @method
   * @returns {void}
   */
  hide() {
    this.#container.classList.replace(showingClass, hidingClass)
  }

  /**
   * @method
   * @param {number} progressRatio
   * @returns {void}
   */
  setProgress(progressRatio) {
    const progressInPercent = Math.round(progressRatio * 100)
    const formattedProgressInPercent = `${progressInPercent}%`

    this.#bar.style.width = formattedProgressInPercent
    this.#bar.innerText = formattedProgressInPercent
  }
}
