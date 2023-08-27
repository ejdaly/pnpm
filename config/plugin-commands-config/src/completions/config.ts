export function rcOptionsTypes () {
  return {}
}

export function cliOptionsTypes () {
  return {
    global: Boolean,
    location: ['global', 'project'],
    json: Boolean,
  }
}

export const commandNames = ['config', 'c']
