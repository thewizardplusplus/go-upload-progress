import { Tag } from '../libs/markup.mjs'
import { IconWithTextViews } from './IconWithTextViews.mjs'

export function NoFilesView() {
  return new Tag('p', { class: 'text-muted' }, [
    ...IconWithTextViews({ iconName: 'file-earmark-x', text: 'No files' }),
  ])
}
