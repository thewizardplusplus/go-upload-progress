class Text {
  text = "";

  constructor(text) {
    this.text = text ?? this.text;
  }

  toDOM() {
    return document.createTextNode(this.text);
  }
}

class Tag {
  name;
  attributes = {};
  children = [];

  constructor(name, attributes, children) {
    if (name === undefined) {
      throw new Error("tag name is required");
    }
    // support for a call with only two arguments: a name and children
    if (children === undefined && Array.isArray(attributes)) {
      children = attributes;
      attributes = undefined;
    }

    this.name = name;
    this.attributes = attributes ?? this.attributes;
    this.children = children ?? this.children;
  }

  toDOM() {
    const element = document.createElement(this.name);

    Object.entries(this.attributes).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });

    this.children.forEach((child) => {
      element.appendChild(child.toDOM());
    });

    return element;
  }
}
