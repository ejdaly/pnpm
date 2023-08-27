import * as list from './list'

export { cliOptionsTypes, rcOptionsTypes, commandNames } from './completions/ll'

export const help = list.help

export async function handler (
  opts: list.ListCommandOptions,
  params: string[]
) {
  return list.handler({ ...opts, long: true }, params)
}
