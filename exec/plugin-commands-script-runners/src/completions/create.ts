import pick from 'ramda/src/pick'
import { types } from '@pnpm/config/lib/types'

export function rcOptionsTypes () {
  return {
    ...pick([
      'use-node-version',
    ], types),
  }
}

export function cliOptionsTypes () {
  return {
    ...rcOptionsTypes(),
  }
}

export const commandNames = ['create']