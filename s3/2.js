const fib = (index) => {
    switch (index) {
      case 0:
      case 1:
        return 1
      default:
        return fib(index - 1) + fib(index - 2)
    }
  }
  
  // console.log(fib(3))
  // console.log(fib(5))
  // console.log(fib(8))
  // console.log(process.argv)
  if (process.argv.length < 3) {
    console.log('usage: node 2.js <fibonacci index>')
  } else {
    let index = parseInt(process.argv[2])
    if (isNaN(index) || index < 0) {
      console.log('index must be a positive integer')
    } else {
      console.log(fib(index))
    }
  }