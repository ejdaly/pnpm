import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'

export function rcOptionsTypes () {
  return pick([
    'depth',
    'dev',
    'global-dir',
    'global',
    'json',
    'long',
    'only',
    'optional',
    'parseable',
    'production',
  ], allTypes)
}

export const cliOptionsTypes = () => ({
  ...rcOptionsTypes(),
  'only-projects': Boolean,
  recursive: Boolean,
})

export const shorthands = {
  D: '--dev',
  P: '--production',
}

export const commandNames = ['list', 'ls']