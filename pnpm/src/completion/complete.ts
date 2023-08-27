import { type Completion, type CompletionFunc } from '@pnpm/command'
import { getOptionCompletions } from './getOptionType'
import { optionTypesToCompletions } from '../optionTypesToCompletions'
import { shorthands as universalShorthands } from './shorthands'

export async function complete (
  ctx: {
    cliOptionsTypesByCommandName: Record<string, () => Record<string, unknown>>
    completionByCommandName: Record<string, CompletionFunc>
    initialCompletion: () => Completion[]
    shorthandsByCommandName: Record<string, Record<string, string | string[]>>
    universalOptionsTypes: Record<string, unknown>
  },
  input: {
    params: string[]
    cmd: string | null
    currentTypedWordType: 'option' | 'value' | null
    lastOption: string | null
    options: Record<string, unknown>
  }
) {
  if (input.options.version) return []
  const optionTypes = {
    ...ctx.universalOptionsTypes,
    ...((input.cmd && ctx.cliOptionsTypesByCommandName[input.cmd]?.()) ?? {}),
  }

  // Autocompleting option values
  if (input.currentTypedWordType !== 'option') {
    if (input.lastOption === '--filter') {
      try {
        const { findWorkspaceDir } = await import('@pnpm/find-workspace-dir')
        const { findWorkspacePackagesNoCheck } = await import('@pnpm/workspace.find-packages')
        const workspaceDir = await findWorkspaceDir(process.cwd()) ?? process.cwd()
        const allProjects = await findWorkspacePackagesNoCheck(workspaceDir, {})
        return allProjects
          .filter(({ manifest }) => manifest.name)
          .map(({ manifest }) => ({ name: manifest.name }))
      } catch {
        return []
      }
    } else if (input.lastOption) {
      const optionCompletions = getOptionCompletions(
        optionTypes as any, // eslint-disable-line
        {
          ...universalShorthands,
          ...(input.cmd ? ctx.shorthandsByCommandName[input.cmd] : {}),
        },
        input.lastOption
      )
      if (optionCompletions !== undefined) {
        return optionCompletions.map((name) => ({ name }))
      }
    }
  }
  let completions: Completion[] = []
  if (input.currentTypedWordType !== 'option') {
    if (!input.cmd || input.currentTypedWordType === 'value' && !ctx.completionByCommandName[input.cmd]) {
      // console.log("initial completion")
      completions = ctx.initialCompletion()
    } else if (ctx.completionByCommandName[input.cmd]) {
      try {
        completions = await ctx.completionByCommandName[input.cmd](input.options, input.params)
      } catch (err) {
        // Ignore
        console.log(err)
      }
    }
  }
  // if (input.currentTypedWordType === 'value') {
  //   return completions
  // }
  if (input.currentTypedWordType !== 'option') {
    return completions
  }
  if (!input.cmd) {
    return [
      ...completions,
      ...optionTypesToCompletions(optionTypes),
      { name: '--version' },
    ]
  }
  return [
    ...completions,
    ...optionTypesToCompletions(optionTypes as any), // eslint-disable-line
  ]
}