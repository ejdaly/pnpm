export function rcOptionsTypes () {
  return {}
}

export function cliOptionsTypes () {
  return {
    ...rcOptionsTypes(),
    check: Boolean,
  }
}

export const commandNames = ['dedupe']
