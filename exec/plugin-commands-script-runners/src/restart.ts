import renderHelp from 'render-help'
import {
  handler as run,
  IF_PRESENT_OPTION_HELP,
  type RunOpts,
} from './run'

export { cliOptionsTypes, rcOptionsTypes, commandNames } from './completions/restart'

export function help () {
  return renderHelp({
    description: 'Restarts a package. Runs a package\'s "stop", "restart", and "start" scripts, and associated pre- and post- scripts.',
    descriptionLists: [
      {
        title: 'Options',

        list: [
          IF_PRESENT_OPTION_HELP,
        ],
      },
    ],
    usages: ['pnpm restart [-- <args>...]'],
  })
}

export async function handler (
  opts: RunOpts,
  params: string[]
) {
  await run(opts, ['stop', ...params])
  await run(opts, ['restart', ...params])
  await run(opts, ['start', ...params])
}
