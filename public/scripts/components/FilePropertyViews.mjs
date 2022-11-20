import { Text, Tag } from '../libs/markup.mjs'
import { IconView } from './IconView.mjs'

export function FilePropertyViews(attributes) {
  return [
    new Tag('dt', [new Text(attributes.name)]),
    new Tag('dd', attributes.isLast ? { class: 'mb-0' } : undefined, [
      IconView({ iconName: attributes.valueIconName }),
      Text.nonBreakingSpace,
      attributes.valueTag,
    ]),
  ]
}
