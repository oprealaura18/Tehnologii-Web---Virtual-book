let o ={
    name: 'some name',
    age: 111
}

let a=[1,2,3,4,5]

console.log(a)

console.log(a[3])

a.push('new value')
console.log(a[5])

for(let element of a){
    console.log(element)
}

for(let key in o){
    console.log(o[key])
}
