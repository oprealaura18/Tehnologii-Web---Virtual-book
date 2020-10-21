 const sampleArray = [1,2,3,4,5,6,7,8]
// const sampleTransformation = (x) => x ** 2

// const map=(a,t)=>{
//   const rez=[]
//   for(let i of a ){
//   rez.push(t(i))
//   }
//   return rez
// }
// console.log(map(sampleArray, sampleTransformation))

const samplePredicate = (e) => e > 5

const filter=(a,p)=>{
  const rez =[]
  for(const el of a ){
    if(p(el)){
    rez.push(el)
  }
}
  return rez
}

console.log(filter(sampleArray, samplePredicate))