import { types as allTypes } from '@pnpm/config/lib/types'
import pick from 'ramda/src/pick'
import { type CompletionFunc } from '@pnpm/command'

export async function readDepNameCompletions (dir?: string) {
  const { readProjectManifest } = await import('@pnpm/read-project-manifest')
  const { getAllDependenciesFromManifest } = await import('@pnpm/manifest-utils')
  const { manifest } = await readProjectManifest(dir ?? process.cwd())
  return Object.keys(
    getAllDependenciesFromManifest(manifest)
  ).map((name) => ({ name }))
}

export function rcOptionsTypes () {
  return pick([
    'cache-dir',
    'global-dir',
    'global-pnpmfile',
    'global',
    'lockfile-dir',
    'lockfile-directory',
    'lockfile-only',
    'lockfile',
    'node-linker',
    'package-import-method',
    'pnpmfile',
    'reporter',
    'save-dev',
    'save-optional',
    'save-prod',
    'shared-workspace-lockfile',
    'store',
    'store-dir',
    'strict-peer-dependencies',
    'virtual-store-dir',
  ], allTypes)
}

export const cliOptionsTypes = () => ({
  ...rcOptionsTypes(),
  ...pick(['force'], allTypes),
  recursive: Boolean,
})

// Unlike npm, pnpm does not treat "r" as an alias of "remove".
// This way we avoid the confusion about whether "pnpm r" means remove, run, or recursive.
export const commandNames = ['remove', 'uninstall', 'rm', 'un', 'uni']

export const completion: CompletionFunc = async (cliOpts, params) => {
  return readDepNameCompletions(cliOpts.dir as string)
}