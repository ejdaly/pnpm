import { types as allTypes } from '@pnpm/config/lib/types'
import pick from 'ramda/src/pick'

export function cliOptionsTypes () {
  return {
    ...pick([
      'dev',
      'json',
      'only',
      'optional',
      'production',
      'registry',
    ], allTypes),
    'audit-level': ['low', 'moderate', 'high', 'critical'],
    fix: Boolean,
    'ignore-registry-errors': Boolean,
  }
}

export const shorthands = {
  D: '--dev',
  P: '--production',
}

export const commandNames = ['audit']

export const rcOptionsTypes = cliOptionsTypes