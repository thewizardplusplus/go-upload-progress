import { Text, Tag } from '../libs/markup.mjs'
import { FilePropertyViews } from './FilePropertyViews.mjs'
import { IconView } from './IconView.mjs'

const formatLocale = 'en-US'
const sizeFormatOptions = { style: 'unit' }
const sizeFormatUnits = ['byte', 'kilobyte', 'megabyte', 'gigabyte']
const datetimeFormatOptions = { dateStyle: 'full', timeStyle: 'long' }

export function FileInfoView(attributes) {
  return new Tag('div', { class: 'card mb-3' }, [
    new Tag('div', { class: 'card-body d-flex' }, [
      new Tag('dl', { class: 'flex-grow-1 me-3 mb-0' }, [
        ...FilePropertyViews({
          name: 'name',
          valueIconName: 'link',
          valueTag: new Tag(
            'a',
            { href: `/files/${attributes.fileInfo.Name}` },
            [new Text(attributes.fileInfo.Name)],
          ),
        }),
        ...FilePropertyViews({
          name: 'size',
          valueIconName: 'file-earmark',
          valueTag: new Text(formatSize(attributes.fileInfo.SizeInB)),
        }),
        ...FilePropertyViews({
          name: 'modification time',
          valueIconName: 'calendar',
          valueTag: new Tag(
            'time',
            { datetime: attributes.fileInfo.ModificationTime },
            [new Text(formatDatetime(attributes.fileInfo.ModificationTime))],
          ),
          isLast: true,
        }),
      ]),
      new Tag(
        'button',
        {
          class: 'btn btn-outline-secondary align-self-start',
          onclick: attributes.onFileDeleting,
        },
        [IconView({ iconName: 'trash' })],
      ),
    ]),
  ])
}

function formatSize(sizeInB) {
  let size = sizeInB
  let unitIndex = 0
  while (size >= 1024) {
    size /= 1024
    unitIndex++
  }

  const formatter = new Intl.NumberFormat(formatLocale, {
    ...sizeFormatOptions,
    unit: sizeFormatUnits[unitIndex],
  })
  return formatter.format(size)
}

function formatDatetime(datetime) {
  const parsedDatetime = new Date(datetime)

  const formatter = new Intl.DateTimeFormat(formatLocale, {
    ...datetimeFormatOptions,
  })
  return formatter.format(parsedDatetime)
}
