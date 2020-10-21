const sampleDictionary = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']

const sampleString = `
  best
  read
  on
  windy
  nights
`

const checkAcrostic = (input, dictionary) => {
  const lines = input.split('\n')
  let target = ''
  for (const line of lines) {
    if (line.trim()) {
      target += line.trim()[0]
    }
  }
  return dictionary.indexOf(target) !== -1
}

console.log(checkAcrostic(sampleString, sampleDictionary))