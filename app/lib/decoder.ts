// Our QR codes should all be in the form of <path>:<id>
export function partnerIdFromCode(code: string) {
  const codeMatch = code.match(/partner\:(\w{8}\-\w{4}\-4\w{3}\-\w{4}\-\w{12})/)

  if (!codeMatch) return {}

  return { path: 'partner', id: codeMatch?.[1] }
}

export function pieceIdFromCode(code: string) {
  const codeMatch = code.match(/piece\:(\d+)/)

  if (!codeMatch) return {}

  return { path: 'piece', id: codeMatch?.[1] }
}