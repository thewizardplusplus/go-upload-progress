import { Text, Tag } from '../libs/markup.mjs'
import { IconView } from './IconView.mjs'

export function NoFilesView() {
  return new Tag('p', { class: 'text-muted' }, [
    IconView({ iconName: 'file-earmark-x' }),
    Text.nonBreakingSpace,
    new Text('No files'),
  ])
}
