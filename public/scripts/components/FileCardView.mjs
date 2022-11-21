import { Tag } from '../libs/markup.mjs'
import { FileInfoView } from './FileInfoView.mjs'
import { IconView } from './IconView.mjs'

export function FileCardView(attributes) {
  return new Tag('div', { class: 'card mb-3' }, [
    new Tag('div', { class: 'card-body d-flex' }, [
      FileInfoView({ additionalClasses: 'flex-grow-1 me-3', fileInfo: attributes.fileInfo }),
      new Tag(
        'button',
        {
          class: 'btn btn-outline-secondary align-self-start',
          onclick: attributes.onFileDeleting,
        },
        [IconView({ name: 'trash' })],
      ),
    ]),
  ])
}
