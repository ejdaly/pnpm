import { types as allTypes } from '@pnpm/config/lib/types'
import pick from 'ramda/src/pick'

export function rcOptionsTypes () {
  return {
    ...pick([
      'npm-path',
      'reporter',
      'scripts-prepend-node-path',
      'unsafe-perm',
      'store-dir',
    ], allTypes),
  }
}

export function cliOptionsTypes () {
  return {
    ...rcOptionsTypes(),
    pending: Boolean,
    recursive: Boolean,
  }
}

export const commandNames = ['rebuild', 'rb']
