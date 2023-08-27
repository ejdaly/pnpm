import * as completions from '@pnpm/plugin-commands-installation/lib/completions'

const { install } = completions

export const { cliOptionsTypes, rcOptionsTypes } = install

export const commandNames = ['install-test', 'it']