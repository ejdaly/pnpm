import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'
import { type CompletionFunc } from '@pnpm/command'

export const IF_PRESENT_OPTION = {
  'if-present': Boolean,
}

export const shorthands = {
  parallel: [
    '--workspace-concurrency=Infinity',
    '--no-sort',
    '--stream',
    '--recursive',
  ],
  sequential: [
    '--workspace-concurrency=1',
  ],
}

export function rcOptionsTypes () {
  return {
    ...pick([
      'npm-path',
      'use-node-version',
    ], allTypes),
  }
}

export function cliOptionsTypes () {
  return {
    ...pick([
      'bail',
      'sort',
      'unsafe-perm',
      'use-node-version',
      'workspace-concurrency',
      'scripts-prepend-node-path',
    ], allTypes),
    ...IF_PRESENT_OPTION,
    recursive: Boolean,
    reverse: Boolean,
    'resume-from': String,
    'report-summary': Boolean,
  }
}

export const completion: CompletionFunc = async (cliOpts, params) => {
  if (params.length > 0) {
    return []
  }
  const { readProjectManifestOnly } = await import('@pnpm/read-project-manifest')

  // Completion shouldn't depend on engines in package.json...?
  const manifest = await readProjectManifestOnly(cliOpts.dir as string ?? process.cwd())
  return Object.keys(manifest.scripts ?? {}).map((name) => ({ name }))
}

export const commandNames = ['run', 'run-script']
