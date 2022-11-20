const showingClass = 'd-block'
const hidingClass = 'd-none'

export class ProgressView {
  #container
  #bar

  constructor() {
    this.#container = document.querySelector('.progress-container')
    this.#bar = document.querySelector('.progress-bar')
  }

  show() {
    this.#container.classList.replace(hidingClass, showingClass)
  }

  hide() {
    this.#container.classList.replace(showingClass, hidingClass)
  }

  setProgress(progressRatio) {
    const progressInPercent = Math.round(progressRatio * 100)
    const formattedProgressInPercent = `${progressInPercent}%`

    this.#bar.style.width = formattedProgressInPercent
    this.#bar.innerText = formattedProgressInPercent
  }
}
