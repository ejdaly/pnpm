import { types as allTypes } from '@pnpm/config/lib/types'
import pick from 'ramda/src/pick'

export function rcOptionsTypes () {
  return pick([], allTypes)
}

export function cliOptionsTypes () {
  return { ...rcOptionsTypes() }
}

export const commandNames = ['patch-remove']
