const genCheckPrime = () => {
 const cache = []

 const checkPrime = (n) => {
   if (cache.indexOf(n) !== -1){
     console.log(`found ${n} in cache`)
     return true
   } else {
     for (let i = 2; i <= n ** 1/2; i++) {
       if (n % i === 0){
         return false
       }
     }
     if (n > 1) {
       cache.push(n)
     }
     return n > 1
   }
 }
 return checkPrime
}

const checkPrime = genCheckPrime()

console.log(checkPrime(7))
console.log(checkPrime(17))
console.log(checkPrime(27))

console.log(checkPrime(7))