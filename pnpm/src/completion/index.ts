import { type CompletionFunc } from '@pnpm/command'
import { types as allTypes } from '@pnpm/config/lib/types'

import * as audit from '@pnpm/plugin-commands-audit/lib/completions'
import * as configCompletions from '@pnpm/plugin-commands-config/lib/completions'

import * as doctor from '@pnpm/plugin-commands-doctor/lib/completions'
import * as env from '@pnpm/plugin-commands-env/lib/completions'

import * as installationCompletions from '@pnpm/plugin-commands-installation/lib/completions'

import * as listingCompletions from '@pnpm/plugin-commands-listing/lib/completions'
import * as licenses from '@pnpm/plugin-commands-licenses/lib/completions'

import * as outdated from '@pnpm/plugin-commands-outdated/lib/completions'

import * as publishingCompletions from '@pnpm/plugin-commands-publishing/lib/completions'

import * as patchCompletions from '@pnpm/plugin-commands-patching/lib/completions'

import * as rebuild from '@pnpm/plugin-commands-rebuild/lib/completions'

import * as scriptRunners from '@pnpm/plugin-commands-script-runners/lib/completions'

import * as server from '@pnpm/plugin-commands-server/lib/completions'
import * as setup from '@pnpm/plugin-commands-setup/lib/completions'
import * as store from '@pnpm/plugin-commands-store/lib/completions'
import * as init from '@pnpm/plugin-commands-init/lib/completions'

import pick from 'ramda/src/pick'

import { type PnpmOptions } from '../../src/types'
import * as bin from './bin'

import { createCompletion } from './completion'

import * as installTest from './installTest'
import * as recursive from './recursive'
import * as root from './root'
const { config, getCommand, setCommand } = configCompletions

const {
  add,
  ci,
  dedupe,
  fetch,
  install,
  link,
  prune,
  remove,
  unlink,
  update,
  importCommand,
} = installationCompletions

// import * as deploy from '@pnpm/plugin-commands-deploy/completions'
const deploy = {
  ...install,
  commandNames: ['deploy'],
}
const { list, ll, why } = listingCompletions
const {
  pack, publish,
} = publishingCompletions
const {
  patch, patchCommit, patchRemove,
} = patchCompletions

const {
  create,
  dlx,
  exec,
  restart,
  run,
  test,
} = scriptRunners

export const GLOBAL_OPTIONS = pick([
  'color',
  'dir',
  'filter',
  'filter-prod',
  'loglevel',
  'help',
  'parseable',
  'prefix',
  'reporter',
  'stream',
  'aggregate-output',
  'test-pattern',
  'changed-files-ignore-pattern',
  'use-stderr',
  'ignore-workspace',
  'workspace-packages',
  'workspace-root',
  'include-workspace-root',
], allTypes)

export type CommandResponse = string | { output?: string, exitCode: number }

export type Command = (
  (opts: PnpmOptions | any, params: string[]) => CommandResponse | Promise<CommandResponse> // eslint-disable-line @typescript-eslint/no-explicit-any
) | (
  (opts: PnpmOptions | any, params: string[]) => void // eslint-disable-line @typescript-eslint/no-explicit-any
) | (
  (opts: PnpmOptions | any, params: string[]) => Promise<void> // eslint-disable-line @typescript-eslint/no-explicit-any
)

export interface CommandDefinition {
  /** The main logic of the command. */
  handler: Command
  /** The help text for the command that describes its usage and options. */
  help: () => string
  /** The names that will trigger this command handler. */
  commandNames: string[]
  /**
   * A function that returns an object whose keys are acceptable CLI options
   * for this command and whose values are the types of values
   * for these options for validation.
   */
  cliOptionsTypes: () => Record<string, unknown>
  /**
   * A function that returns an object whose keys are acceptable options
   * in the .npmrc file for this command and whose values are the types of values
   * for these options for validation.
   */
  rcOptionsTypes: () => Record<string, unknown>
  /** Auto-completion provider for this command. */
  completion?: CompletionFunc
  /**
   * Option names that will resolve into one or more of the other options.
   *
   * Example:
   * ```ts
   * {
   *   D: '--dev',
   *   parallel: ['--no-sort', '--recursive'],
   * }
   * ```
   */
  shorthands?: Record<string, string | string[]>
}

type CommandDefinition2 = Pick<CommandDefinition, 'rcOptionsTypes' | 'commandNames' | 'cliOptionsTypes' | 'completion' | 'shorthands'>

const commands: CommandDefinition2[] = [
  add,
  audit,
  bin,
  ci,
  config,
  dedupe,
  getCommand,
  setCommand,
  create,
  deploy,
  dlx,
  doctor,
  env,
  exec,
  fetch,
  importCommand,
  init,
  install,
  installTest,
  link,
  list,
  ll,
  licenses,
  outdated,
  pack,
  patch,
  patchCommit,
  patchRemove,
  prune,
  publish,
  rebuild,
  recursive,
  remove,
  restart,
  root,
  run,
  server,
  setup,
  store,
  test,
  unlink,
  update,
  why,
]

const cliOptionsTypesByCommandName: Record<string, () => Record<string, unknown>> = {}
const aliasToFullName = new Map<string, string>()
const completionByCommandName: Record<string, CompletionFunc> = {}
const shorthandsByCommandName: Record<string, Record<string, string | string[]>> = {}
const rcOptionsTypes: Record<string, unknown> = {}

for (let i = 0; i < commands.length; i++) {
  const {
    cliOptionsTypes,
    commandNames,
    completion,
    rcOptionsTypes,
    shorthands,
  } = commands[i]
  if (!commandNames || commandNames.length === 0) {
    throw new Error(`The command at index ${i} doesn't have command names`)
  }
  for (const commandName of commandNames) {
    cliOptionsTypesByCommandName[commandName] = cliOptionsTypes
    shorthandsByCommandName[commandName] = shorthands ?? {}
    if (completion != null) {
      completionByCommandName[commandName] = completion
    }
    Object.assign(rcOptionsTypes, rcOptionsTypes())
  }
  if (commandNames.length > 1) {
    const fullName = commandNames[0]
    for (let i = 1; i < commandNames.length; i++) {
      aliasToFullName.set(commandNames[i], fullName)
    }
  }
}

export const pnpmCompletion = createCompletion({
  cliOptionsTypesByCommandName,
  completionByCommandName,
  initialCompletion,
  shorthandsByCommandName,
  universalOptionsTypes: GLOBAL_OPTIONS,
})

function initialCompletion () {
  return Object.keys(cliOptionsTypesByCommandName).map((name) => ({ name }))
}

export function getCliOptionsTypes (commandName: string) {
  return cliOptionsTypesByCommandName[commandName]?.() || {}
}

export function getCommandFullName (commandName: string) {
  return aliasToFullName.get(commandName) ??
    (cliOptionsTypesByCommandName[commandName] ? commandName : null)
}

export { shorthandsByCommandName, rcOptionsTypes }

pnpmCompletion().catch(err => {
  throw err
})