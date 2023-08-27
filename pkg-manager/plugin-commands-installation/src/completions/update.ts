import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'
import { type CompletionFunc } from '@pnpm/command'

export async function readDepNameCompletions (dir?: string) {
  const { readProjectManifest } = await import('@pnpm/read-project-manifest')
  const { manifest } = await readProjectManifest(dir ?? process.cwd())
  const { getAllDependenciesFromManifest } = await import('@pnpm/manifest-utils')
  return Object.keys(
    getAllDependenciesFromManifest(manifest)
  ).map((name) => ({ name }))
}

export function rcOptionsTypes () {
  return pick([
    'cache-dir',
    'depth',
    'dev',
    'engine-strict',
    'fetch-retries',
    'fetch-retry-factor',
    'fetch-retry-maxtimeout',
    'fetch-retry-mintimeout',
    'fetch-timeout',
    'force',
    'global-dir',
    'global-pnpmfile',
    'global',
    'https-proxy',
    'ignore-pnpmfile',
    'ignore-scripts',
    'lockfile-dir',
    'lockfile-directory',
    'lockfile-only',
    'lockfile',
    'lockfile-include-tarball-url',
    'network-concurrency',
    'noproxy',
    'npmPath',
    'offline',
    'only',
    'optional',
    'package-import-method',
    'pnpmfile',
    'prefer-offline',
    'production',
    'proxy',
    'registry',
    'reporter',
    'save',
    'save-exact',
    'save-prefix',
    'save-workspace-protocol',
    'scripts-prepend-node-path',
    'shamefully-flatten',
    'shamefully-hoist',
    'shared-workspace-lockfile',
    'side-effects-cache-readonly',
    'side-effects-cache',
    'store',
    'store-dir',
    'unsafe-perm',
    'use-running-store-server',
  ], allTypes)
}

export function cliOptionsTypes () {
  return {
    ...rcOptionsTypes(),
    interactive: Boolean,
    latest: Boolean,
    recursive: Boolean,
    workspace: Boolean,
  }
}

export const shorthands = {
  D: '--dev',
  P: '--production',
}

export const commandNames = ['update', 'up', 'upgrade']

export const completion: CompletionFunc = async (cliOpts) => {
  return readDepNameCompletions(cliOpts.dir as string)
}
