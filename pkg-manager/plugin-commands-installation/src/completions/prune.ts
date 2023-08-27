import { types as allTypes } from '@pnpm/config/lib/types'
import pick from 'ramda/src/pick'

export const rcOptionsTypes = cliOptionsTypes

export function cliOptionsTypes () {
  return pick([
    'dev',
    'optional',
    'production',
  ], allTypes)
}

export const commandNames = ['prune']
