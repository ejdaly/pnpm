import {
  docsUrl,
  readDepNameCompletions,
} from '@pnpm/cli-utils'
import { type CompletionFunc } from '@pnpm/command'
import { PnpmError } from '@pnpm/error'
import renderHelp from 'render-help'
import { licensesList, type LicensesCommandOptions } from './licensesList'

export { cliOptionsTypes, rcOptionsTypes, commandNames, shorthands } from './completions'

export function help () {
  return renderHelp({
    description: 'Check the licenses of the installed packages.',
    descriptionLists: [
      {
        title: 'Options',

        list: [
          {
            description:
              'Show more details (such as a link to the repo) are not displayed. \
To display the details, pass this option.',
            name: '--long',
          },
          {
            description: 'Show information in JSON format',
            name: '--json',
          },
          {
            description: 'Check only "dependencies" and "optionalDependencies"',
            name: '--prod',
            shortAlias: '-P',
          },
          {
            description: 'Check only "devDependencies"',
            name: '--dev',
            shortAlias: '-D',
          },
          {
            description: 'Don\'t check "optionalDependencies"',
            name: '--no-optional',
          },
        ],
      },
    ],
    url: docsUrl('licenses'),
    usages: [
      'pnpm licenses ls',
      'pnpm licenses list',
      'pnpm licenses list --long',
    ],
  })
}

export const completion: CompletionFunc = async (cliOpts) => {
  return readDepNameCompletions(cliOpts.dir as string)
}

export async function handler (
  opts: LicensesCommandOptions,
  params: string[] = []
) {
  if (params.length === 0) {
    throw new PnpmError('LICENCES_NO_SUBCOMMAND', 'Please specify the subcommand', {
      hint: help(),
    })
  }
  switch (params[0]) {
  case 'list':
  case 'ls':
    return licensesList(opts)
  default: {
    throw new PnpmError('LICENSES_UNKNOWN_SUBCOMMAND', 'This subcommand is not known')
  }
  }
}
