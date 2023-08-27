import omit from 'ramda/src/omit'
import * as list from './list'

export const commandNames = ['ll', 'la']

export const rcOptionsTypes = list.rcOptionsTypes

export function cliOptionsTypes () {
  return omit(['long'], list.cliOptionsTypes())
}