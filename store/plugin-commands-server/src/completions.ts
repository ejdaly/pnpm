import pick from 'ramda/src/pick'
import { types as allTypes } from '@pnpm/config/lib/types'

export const rcOptionsTypes = cliOptionsTypes

export function cliOptionsTypes () {
  return {
    ...pick([
      'store',
      'store-dir',
    ], allTypes),
    background: Boolean,
    'ignore-stop-requests': Boolean,
    'ignore-upload-requests': Boolean,
    port: Number,
    protocol: ['auto', 'tcp', 'ipc'],
  }
}

export const commandNames = ['server']
