/**
 * @module components/FileInfoView
 */

import { Text, Tag } from '../libs/markup.mjs'
import { FilePropertyViews } from './FilePropertyViews.mjs'

const formatLocale = 'en-US'
const sizeFormatOptions = { style: 'unit' }
const sizeFormatUnits = ['byte', 'kilobyte', 'megabyte', 'gigabyte']
const datetimeFormatOptions = { dateStyle: 'full', timeStyle: 'long' }

/**
 * @typedef {import('../libs/api.mjs').FileInfo} FileInfo
 */

/**
 * @typedef {Object} FileInfoViewAttributes
 * @property {string} additionalClasses
 * @property {FileInfo} fileInfo
 */

/**
 * @function
 * @param {FileInfoViewAttributes} attributes
 * @returns {Tag}
 */
export function FileInfoView(attributes) {
  return new Tag('dl', { class: `mb-0 ${attributes.additionalClasses}` }, [
    ...FilePropertyViews({
      name: 'name',
      valueIconName: 'link',
      valueText: new Tag('a', { href: '/files/' + attributes.fileInfo.Name }, [
        new Text(attributes.fileInfo.Name),
      ]),
    }),
    ...FilePropertyViews({
      name: 'size',
      valueIconName: 'file-earmark',
      valueText: formatSize(attributes.fileInfo.SizeInB),
    }),
    ...FilePropertyViews({
      name: 'modification time',
      valueIconName: 'calendar',
      valueText: new Tag('time', { datetime: attributes.fileInfo.ModificationTime }, [
        new Text(formatDatetime(attributes.fileInfo.ModificationTime)),
      ]),
      isLast: true,
    }),
  ])
}

function formatSize(/** @type {number} */ sizeInB) {
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

function formatDatetime(/** @type {string} */ datetime) {
  const parsedDatetime = new Date(datetime)

  // @ts-ignore
  const formatter = new Intl.DateTimeFormat(formatLocale, datetimeFormatOptions)
  return formatter.format(parsedDatetime)
}
