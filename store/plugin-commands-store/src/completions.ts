import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'

import { type CompletionFunc } from '@pnpm/command'
export const rcOptionsTypes = cliOptionsTypes

export function cliOptionsTypes () {
  return pick([
    'registry',
    'store',
    'store-dir',
  ], allTypes)
}

export const commandNames = ['store']
export const completion: CompletionFunc = async (cliOpts, params) => {
  if (params?.length) return []
  return ['status', 'add', 'prune', 'path'].map(name => {
    return { name }
  })
}