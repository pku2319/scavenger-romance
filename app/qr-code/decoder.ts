export function partnerIdFromCode(code: string) {
  const codeMatch = code.match(/partner\:(\w{8}\-\w{4}\-4\w{3}\-\w{4}\-\w{12})/)
  const partnerId = codeMatch?.[1]

  return partnerId
}