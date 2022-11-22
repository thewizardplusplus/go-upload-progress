import { Text, Tag, capitalizeFirstLetter } from '../libs/markup.mjs'
import { IconWithTextViews } from './IconWithTextViews.mjs'

export function ToastHeaderView(attributes) {
  const textColorStyleClass = 'text-' + attributes.kind.colorStyle
  const borderColorStyleClass = 'border-' + attributes.kind.colorStyle

  return new Tag('div', { class: `toast-header ${borderColorStyleClass}` }, [
    ...IconWithTextViews({
      iconName: attributes.kind.iconName,
      iconColorStyle: attributes.kind.colorStyle,
      text: new Tag('strong', { class: `${textColorStyleClass} flex-grow-1` }, [
        new Text(capitalizeFirstLetter(attributes.kind.title)),
      ]),
    }),
    new Tag('button', { class: 'btn-close', type: 'button', onclick: attributes.onToastClosing }),
  ])
}
