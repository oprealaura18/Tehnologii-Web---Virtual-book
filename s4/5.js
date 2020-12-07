function sampleFunction(a,b,c){
 for(let i=0;i<100;i++){
  console.log(a+b+c+i)
 }
}

sampleFunction(1,2,3)

function timed (f){
 return function(...args){
  const before=Date.now()
  const result=f(...args)
  const after=Date.now()
  console.log(`i took ${after - before}ms to run`)
  return result
}
}

const timedSampleFunction = timed(sampleFunction)
console.log("\n")
timedSampleFunction(1, 2, 3)
