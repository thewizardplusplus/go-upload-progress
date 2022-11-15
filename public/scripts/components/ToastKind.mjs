export class ToastKind {
  #colorStyle;
  #icon;
  #title;

  constructor(colorStyle, icon, title) {
    if (colorStyle === undefined) {
      throw new Error("toast color style is required");
    }
    if (icon === undefined) {
      throw new Error("toast icon is required");
    }
    if (title === undefined) {
      throw new Error("toast title is required");
    }

    this.#colorStyle = colorStyle;
    this.#icon = icon;
    this.#title = title;
  }

  get colorStyle() {
    return this.#colorStyle;
  }

  get icon() {
    return this.#icon;
  }

  get title() {
    return this.#title;
  }
}
