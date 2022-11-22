import { Tag } from '../libs/markup.mjs'
import { IconWithTextViews } from './IconWithTextViews.mjs'

export const noFilesID = 'no-files'

export function NoFilesView() {
  return new Tag('p', { id: noFilesID, class: 'text-muted' }, [
    ...IconWithTextViews({ iconName: 'file-earmark-x', text: 'No files' }),
  ])
}
