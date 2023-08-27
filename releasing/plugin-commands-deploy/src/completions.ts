import { install } from '@pnpm/plugin-commands-installation/lib/completions'

export const shorthands = install.shorthands

export function rcOptionsTypes () {
  return install.rcOptionsTypes()
}

export function cliOptionsTypes () {
  return install.cliOptionsTypes()
}

export const commandNames = ['deploy']
