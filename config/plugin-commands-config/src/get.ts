import * as configCmd from './config'
import { type ConfigCommandOptions } from './ConfigCommandOptions'

export { cliOptionsTypes, rcOptionsTypes, commandNames } from './completions/get'

export const help = configCmd.help

export async function handler (opts: ConfigCommandOptions, params: string[]) {
  return configCmd.handler(opts, ['get', ...params])
}
