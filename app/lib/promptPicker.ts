export function promptPicker(type: string, travelerName: string) {
  let promptKey = 0
  if (type.match('choice')) {
    promptKey = travelerName.length % 2
  }

  return promptKey
}