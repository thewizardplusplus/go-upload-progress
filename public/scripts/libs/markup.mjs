/**
 * @module libs/markup
 */

const eventAttributePrefix = 'on'

/**
 * @callback EventHandler
 * @param {Event} event
 * @returns {void}
 */

/**
 * @class
 */
export class Text {
  /**
   * @static
   * @readonly
   * @type {Text}
   */
  static get nonBreakingSpace() {
    return new Text('\u00a0')
  }

  #text = ''

  /**
   * @constructs
   * @param {string} text
   */
  constructor(text) {
    this.#text = text ?? this.#text
  }

  /**
   * @method
   * @returns {globalThis.Text}
   */
  toDOM() {
    return document.createTextNode(this.#text)
  }
}

/**
 * @class
 */
export class Tag {
  /** @type {string} */ #name
  /** @type {Object.<string, string|EventHandler>} */ #attributes = {}
  /** @type {Array.<Node>} */ #children = []

  /**
   * @constructs
   * @param {string} name
   * @param {Object.<string, string|EventHandler>} [attributes]
   * @param {Array.<Node>} [children]
   */
  constructor(name, attributes, children) {
    if (name === undefined) {
      throw new Error('tag name is required')
    }
    // support for a call with only two arguments: a name and children
    if (children === undefined && Array.isArray(attributes)) {
      children = attributes
      attributes = undefined
    }

    this.#name = name
    this.#attributes = attributes ?? this.#attributes
    this.#children = children ?? this.#children
  }

  /**
   * @method
   * @returns {HTMLElement}
   */
  toDOM() {
    const element = document.createElement(this.#name)

    Object.entries(this.#attributes).forEach(([name, value]) => {
      if (name.startsWith(eventAttributePrefix)) {
        const eventName = name.slice(eventAttributePrefix.length)
        // @ts-ignore
        element.addEventListener(eventName, value)

        return
      }

      // @ts-ignore
      element.setAttribute(name, value)
    })

    this.#children.forEach(child => {
      element.appendChild(child.toDOM())
    })

    return element
  }
}

/**
 * @typedef {Text|Tag} Node
 */

/**
 * @function
 * @param {string} text
 * @returns {string}
 */
export function capitalizeFirstLetter(text) {
  // @ts-ignore
  return text.at(0).toUpperCase() + text.slice(1)
}

/**
 * @function
 * @param {string|Node|Array.<Node>} entity
 * @returns {Array.<Node>}
 */
export function transformToChildren(entity) {
  if (typeof entity === 'string' || entity instanceof String) {
    // @ts-ignore
    return [new Text(entity)]
  }

  if (!Array.isArray(entity)) {
    return [entity]
  }

  return entity
}

/**
 * @function
 * @param {string} id
 * @returns {void}
 */
export function removeElementByID(id) {
  const element = document.getElementById(id)
  if (element !== null) {
    element.remove()
  }
}

/**
 * @function
 * @param {string} id
 * @returns {void}
 */
export function removeParentByChildID(id) {
  const child = document.getElementById(id)
  if (child !== null && child.parentElement !== null) {
    child.parentElement.remove()
  }
}

/**
 * @function
 * @param {globalThis.Node} node
 * @returns {void}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node#remove_all_children_nested_within_a_node}
 */
export function removeAllChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
