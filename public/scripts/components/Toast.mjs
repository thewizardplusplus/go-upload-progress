import { Text, Tag, removeElementByID } from '../libs/markup.mjs'
import { IconView } from './IconView.mjs'

export const immortalToastLifetimeInMs = 0
export const defaultToastLifetimeInMs = 2000

export function Toast(attributes) {
  attributes = { lifetimeInMs: defaultToastLifetimeInMs, ...attributes }

  const toastID = `toast-${attributes.id}`
  const removalTimeoutID =
    attributes.lifetimeInMs !== immortalToastLifetimeInMs
      ? setTimeout(() => removeElementByID(toastID), attributes.lifetimeInMs)
      : undefined
  return new Tag(
    'div',
    {
      id: toastID,
      class: `toast border-${attributes.kind.colorStyle} show`,
    },
    [
      new Tag(
        'div',
        { class: `toast-header border-${attributes.kind.colorStyle}` },
        [
          IconView({
            iconName: attributes.kind.iconName,
            colorStyle: attributes.kind.colorStyle,
          }),
          Text.nonBreakingSpace,
          new Tag(
            'strong',
            { class: `text-${attributes.kind.colorStyle} flex-grow-1` },
            [new Text(attributes.kind.title)],
          ),
          new Tag('button', {
            class: 'btn-close',
            type: 'button',
            onclick: () => {
              clearTimeout(removalTimeoutID)
              removeElementByID(toastID)
            },
          }),
        ],
      ),
      new Tag(
        'div',
        { class: 'toast-body' },
        wrapToastBodyIfNecessary(attributes.body),
      ),
    ],
  )
}

function wrapToastBodyIfNecessary(body) {
  if (typeof body === 'string' || body instanceof String) {
    return [new Text(body)]
  }
  if (!Array.isArray(body)) {
    return [body]
  }
  return body
}
