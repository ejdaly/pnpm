import { type Completion, type CompletionFunc } from '@pnpm/command'
import { split as splitCmd } from 'split-cmd'
// This adds about 200KB to bundle
import tabtab from '@pnpm/tabtab'
import {
  currentTypedWordType,
  getLastOption,
} from './getOptionType'
import { parseCliArgs } from '../parseCliArgs'
import { complete } from './complete'

export function createCompletion (
  opts: {
    cliOptionsTypesByCommandName: Record<string, () => Record<string, unknown>>
    completionByCommandName: Record<string, CompletionFunc>
    initialCompletion: () => Completion[]
    shorthandsByCommandName: Record<string, Record<string, string | string[]>>
    universalOptionsTypes: Record<string, unknown>
  }
) {
  return async () => {
    const debug = false
    const env = tabtab.parseEnv(process.env)
    debug && console.log({ env })
    if (!env.complete) return

    // Parse only words that are before the pointer and finished.
    // Finished means that there's at least one space between the word and pointer

    const finishedArgv = env.partial.slice(0, -env.lastPartial.length || env.partial.length)
    // const finishedArgv = env.partial.slice(0, -env.lastPartial.length)

    const inputArgv = splitCmd(finishedArgv).slice(1)
    debug && console.log({
      finishedArgv, inputArgv,
    })
    // We cannot autocomplete what a user types after "pnpm test --"
    if (inputArgv.includes('--')) return
    const { params, options, cmd } = await parseCliArgs(inputArgv)

    // const complete0 = opts
    const complete1 = {
      cmd,
      currentTypedWordType: currentTypedWordType(env),
      lastOption: getLastOption(env),
      options,
      params,
    } as const
    debug && console.dir({ complete1 }, {
      depth: 5,
    })

    // let completed: Array<{ name?: string }>
    // if (!cmd && false) {
    //   const [part1, part2, part3] = await Promise.all([
    //     complete(opts, complete1),
    //     complete(opts, {
    //       ...complete1,
    //       cmd: 'run',
    //     }),
    //     complete(opts, {
    //       ...complete1,
    //       cmd: 'exec',
    //     }),
    //   ])
    //   completed = [...part1, ...part2, ...part3]
    // } else {
    //   completed = await complete(
    //     opts,
    //     complete1
    //   )
    // };
    const completed = await complete(
      opts,
      complete1
    )

    debug && console.dir({ completed })

    return tabtab.log(
      completed
    )
  }
}
