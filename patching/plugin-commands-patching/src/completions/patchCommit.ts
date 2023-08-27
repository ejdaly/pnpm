import { types as allTypes } from '@pnpm/config/lib/types'
import pick from 'ramda/src/pick'

export const rcOptionsTypes = cliOptionsTypes

export function cliOptionsTypes () {
  return pick(['patches-dir'], allTypes)
}

export const commandNames = ['patch-commit']
