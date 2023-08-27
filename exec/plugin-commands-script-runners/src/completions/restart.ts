import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'

import {
  IF_PRESENT_OPTION,
} from './run'

export function rcOptionsTypes () {
  return {
    ...pick([
      'npm-path',
    ], allTypes),
  }
}

export function cliOptionsTypes () {
  return IF_PRESENT_OPTION
}

export const commandNames = ['restart']
