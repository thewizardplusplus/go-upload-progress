import { Text, transformToChildren } from '../libs/markup.mjs'
import { IconView } from './IconView.mjs'

export function IconWithTextViews(attributes) {
  return [
    IconView({ name: attributes.iconName, colorStyle: attributes.iconColorStyle }),
    Text.nonBreakingSpace,
    ...transformToChildren(attributes.text),
  ]
}
