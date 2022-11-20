import { Tag } from '../libs/markup.mjs'

export function IconView(attributes) {
  const colorStyleClass = attributes.colorStyle ? 'text-' + attributes.colorStyle : ''
  return new Tag('i', { class: `bi-${attributes.iconName} ${colorStyleClass}` })
}
