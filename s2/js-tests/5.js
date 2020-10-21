for(var i=0; i<10; i++){
    //here i is visible
}
console.log(i);
//here i is visible
if(i===5){}

for(let j=0; j<10; i++){
    //j is visible ONLY here
}
console.log(j)