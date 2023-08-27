import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'

export function rcOptionsTypes () {
  return {
    ...pick([
      'depth',
      'dev',
      'global-dir',
      'global',
      'long',
      'optional',
      'production',
    ], allTypes),
    compatible: Boolean,
    format: ['table', 'list', 'json'],
  }
}

export const cliOptionsTypes = () => ({
  ...rcOptionsTypes(),
  recursive: Boolean,
})

export const shorthands = {
  D: '--dev',
  P: '--production',
  table: '--format=table',
  'no-table': '--format=list',
  json: '--format=json',
}

export const commandNames = ['outdated']
