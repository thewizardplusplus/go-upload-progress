import { Text, Tag, capitalizeFirstLetter } from '../libs/markup.mjs'
import { IconWithTextViews } from './IconWithTextViews.mjs'

export function FilePropertyViews(attributes) {
  return [
    new Tag('dt', [new Text(formatName(attributes.name))]),
    new Tag('dd', attributes.isLast ? { class: 'mb-0' } : undefined, [
      ...IconWithTextViews({ iconName: attributes.valueIconName, text: attributes.valueText }),
    ]),
  ]
}

function formatName(name) {
  return capitalizeFirstLetter(name) + ':'
}
