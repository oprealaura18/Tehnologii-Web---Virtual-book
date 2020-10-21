const sampleString = 'i found {0} at {1}'

const sampleFormat = ['a cat', 'the petshop']

const formatString = (input, format) => {
      let res=input
      for(let i=0;i<format.length;i++){
        res=res.replace('{'+i+'}',format[i])
      }
      return res
    }

console.log(formatString(sampleString, sampleFormat))
// i found a cat at the petshop