// const sampleString = 'the quick brown fox jumps over the lazy dog'

// const getCounts = (input) => {
//   const result = {}
//   const words = input.split(' ')
//   for (const word of words) {
//     if (word in result) {
//       result[word]++
//     } else {
//       result[word] = 1
//     }
//   }
//   return result
// }

// console.log(getCounts(sampleString))


//////////////////sauuu
// const sampleString = 'the quick brown fox jumps over the lazy dog'

// const getFrequecies = (input) => {
//   const result = {}
//   const words = input.split(' ')
//   for (const word of words) {
//     if (word in result) {
//       result[word]++
//     } else {
//       result[word] = 1
//     }
//   }

//   for (const word in result) {
//     result[word] /= words.length
//   }
  
//   return result
// }

// console.log(getFrequecies(sampleString))

/////////////saaauu
// const sampleString = 'the quick,brown fox jumps over the lazy dog'

// const getFrequecies = (input) => {
//   const result = {}
//   const words = input.split(/[\s,]/)
//   for (const word of words) {
//     if (word in result) {
//       result[word]++
//     } else {
//       result[word] = 1
//     }
//   }

//   for (const word in result) {
//     result[word] /= words.length
//   }

//   return result
// }

// console.log(getFrequecies(sampleString))

//////////////////

const sampleString = 'the quick,brown fox jumps over the lazy dog'

const getLetterFrequecies = (input) => {
  const result = {}
  const punctuation = [' ', ',']
  for (const letter of input) {
    if (punctuation.indexOf(letter) === -1) {
      if (letter in result) {
        result[letter]++
      } else {
        result[letter] = 1
      }
    }
  }

  for (const letter in result) {
    result[letter] /= input.length
  }

  return result
}

console.log(getLetterFrequecies(sampleString))