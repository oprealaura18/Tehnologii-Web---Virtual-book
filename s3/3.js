const checkPrime = (n) => {
    for (let i = 2; i <= n ** 1/2; i++) {
      if (n % i === 0){
        return false
      }
    }
    return n > 1
  }
  
  console.log(checkPrime(7))
  console.log(checkPrime(17))
  console.log(checkPrime(27))