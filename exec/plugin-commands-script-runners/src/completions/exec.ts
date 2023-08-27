import pick from 'ramda/src/pick'
import { types } from '@pnpm/config/lib/types'
import { readdirSync } from 'fs'
import { join } from 'path'
import {
  shorthands as runShorthands,
} from './run'
import { type CompletionFunc } from '@pnpm/command'

export const shorthands = {
  parallel: runShorthands.parallel,
  c: '--shell-mode',
}

export const commandNames = ['exec']

export const completion: CompletionFunc = async (cliOpts, params) => {
  try {
    const rootDir = cliOpts.dir as string ?? process.cwd()
    const files = readdirSync(join(rootDir, 'node_modules/.bin'))
    return files.map(name => {
      return { name }
    })
  } catch {
    return []
  }
}

export function rcOptionsTypes () {
  return {
    ...pick([
      'bail',
      'sort',
      'use-node-version',
      'unsafe-perm',
      'workspace-concurrency',
    ], types),
    'shell-mode': Boolean,
    'resume-from': String,
    'report-summary': Boolean,
  }
}

export const cliOptionsTypes = () => ({
  ...rcOptionsTypes(),
  recursive: Boolean,
  reverse: Boolean,
})