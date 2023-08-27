import { docsUrl } from '@pnpm/cli-utils'
import renderHelp from 'render-help'

export { cliOptionsTypes, rcOptionsTypes, commandNames } from '../completion/bin'

export function help () {
  return renderHelp({
    description: 'Print the directory where pnpm will install executables.',
    descriptionLists: [
      {
        title: 'Options',

        list: [
          {
            description: 'Print the global executables directory',
            name: '--global',
            shortAlias: '-g',
          },
        ],
      },
    ],
    url: docsUrl('bin'),
    usages: ['pnpm bin [-g]'],
  })
}

export async function handler (
  opts: {
    bin: string
  }
) {
  return opts.bin
}
