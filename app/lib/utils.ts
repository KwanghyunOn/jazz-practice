export function exhaustiveCheck(param: never) {}

export function getRandomElement<T>(array: Array<T>, defaultValue?: any) {
  if (array.length === 0) return defaultValue
  return array[Math.floor(Math.random() * array.length)]
}
