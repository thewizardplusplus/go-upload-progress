import { Text, Tag } from '../libs/markup.mjs'

export function FilePropertyViews(attributes) {
  return [
    new Tag('dt', [new Text(attributes.name)]),
    new Tag('dd', attributes.isLast ? { class: 'mb-0' } : undefined, [
      new Tag('i', { class: attributes.valueIcon }),
      Text.nonBreakingSpace,
      attributes.valueTag,
    ]),
  ]
}
