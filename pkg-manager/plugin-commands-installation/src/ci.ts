import { docsUrl } from '@pnpm/cli-utils'
import { PnpmError } from '@pnpm/error'
import renderHelp from 'render-help'

export { cliOptionsTypes, rcOptionsTypes, commandNames, shorthands } from './completions/ci'

export function help () {
  return renderHelp({
    aliases: ['clean-install', 'ic', 'install-clean'],
    description: 'Clean install a project',
    descriptionLists: [],
    url: docsUrl('ci'),
    usages: ['pnpm ci'],
  })
}

export async function handler (opts: unknown) {
  throw new PnpmError('CI_NOT_IMPLEMENTED', 'The ci command is not implemented yet')
}
