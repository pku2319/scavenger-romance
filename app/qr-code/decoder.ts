// Our QR codes should all be in the form of <path>:<id>
export function decoder(code: string) {
  const [path, id] = pieceIdFromCode(code) || partnerIdFromCode(code) || []
  return { path, id }
}

function partnerIdFromCode(code: string) {
  const codeMatch = code.match(/partner\:(\w{8}\-\w{4}\-4\w{3}\-\w{4}\-\w{12})/)

  if (!codeMatch) return null

  return ['partner', codeMatch?.[1]]
}

function pieceIdFromCode(code: string) {
  const codeMatch = code.match(/piece\:(\d+)/)

  if (!codeMatch) return null

  return ['piece', codeMatch?.[1]]
}