import { Tag } from '../libs/markup.mjs'
import { FileInfoView } from './FileInfoView.mjs'
import { IconView } from './IconView.mjs'

const disabledIDCharacters = /[^A-Za-z\d]+/g

export function FileCardView(attributes) {
  const fileCardID = `file-card-${attributes.fileInfo.Name.replaceAll(disabledIDCharacters, '-')}`
  return new Tag('div', { id: fileCardID, class: 'card mb-3' }, [
    new Tag('div', { class: 'card-body d-flex' }, [
      FileInfoView({ additionalClasses: 'flex-grow-1 me-3', fileInfo: attributes.fileInfo }),
      new Tag(
        'button',
        {
          class: 'btn btn-outline-secondary align-self-start',
          onclick: () => attributes.onFileDeleting(fileCardID),
        },
        [IconView({ name: 'trash' })],
      ),
    ]),
  ])
}
