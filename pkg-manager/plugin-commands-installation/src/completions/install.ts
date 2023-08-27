import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'

export function rcOptionsTypes () {
  return pick([
    'cache-dir',
    'child-concurrency',
    'dev',
    'engine-strict',
    'fetch-retries',
    'fetch-retry-factor',
    'fetch-retry-maxtimeout',
    'fetch-retry-mintimeout',
    'fetch-timeout',
    'frozen-lockfile',
    'global-dir',
    'global-pnpmfile',
    'global',
    'hoist',
    'hoist-pattern',
    'https-proxy',
    'ignore-pnpmfile',
    'ignore-scripts',
    'link-workspace-packages',
    'lockfile-dir',
    'lockfile-directory',
    'lockfile-only',
    'lockfile',
    'merge-git-branch-lockfiles',
    'merge-git-branch-lockfiles-branch-pattern',
    'modules-dir',
    'network-concurrency',
    'node-linker',
    'noproxy',
    'package-import-method',
    'pnpmfile',
    'prefer-frozen-lockfile',
    'prefer-offline',
    'production',
    'proxy',
    'public-hoist-pattern',
    'registry',
    'reporter',
    'save-workspace-protocol',
    'scripts-prepend-node-path',
    'shamefully-flatten',
    'shamefully-hoist',
    'shared-workspace-lockfile',
    'side-effects-cache-readonly',
    'side-effects-cache',
    'store',
    'store-dir',
    'strict-peer-dependencies',
    'offline',
    'only',
    'optional',
    'unsafe-perm',
    'use-lockfile-v6',
    'use-running-store-server',
    'use-store-server',
    'verify-store-integrity',
    'virtual-store-dir',
  ], allTypes)
}

export const cliOptionsTypes = () => ({
  ...rcOptionsTypes(),
  ...pick(['force'], allTypes),
  'fix-lockfile': Boolean,
  'resolution-only': Boolean,
  recursive: Boolean,
})

export const shorthands = {
  D: '--dev',
  P: '--production',
}

export const commandNames = ['install', 'i']
