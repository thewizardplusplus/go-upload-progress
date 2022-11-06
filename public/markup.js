class Text {
  text = "";

  constructor(text) {
    this.text = text ?? this.text;
  }

  toDOM() {
    return document.createTextNode(this.text);
  }
}
