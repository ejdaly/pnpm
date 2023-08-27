import { docsUrl } from '@pnpm/cli-utils'
import { UNIVERSAL_OPTIONS } from '@pnpm/common-cli-options-help'
import renderHelp from 'render-help'
import * as install from './install'

export { cliOptionsTypes, rcOptionsTypes, commandNames } from './completions/prune'

export function help () {
  return renderHelp({
    description: 'Removes extraneous packages',
    descriptionLists: [
      {
        title: 'Options',

        list: [
          {
            description: 'Remove the packages specified in `devDependencies`',
            name: '--prod',
          },
          {
            description: 'Remove the packages specified in `optionalDependencies`',
            name: '--no-optional',
          },
          ...UNIVERSAL_OPTIONS,
        ],
      },
    ],
    url: docsUrl('prune'),
    usages: ['pnpm prune [--prod]'],
  })
}

export async function handler (
  opts: install.InstallCommandOptions
) {
  return install.handler({
    ...opts,
    modulesCacheMaxAge: 0,
    pruneDirectDependencies: true,
    pruneStore: true,
  })
}
