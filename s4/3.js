String.prototype.format = function(format)  {
 let result = this
 for (const element in format) {
   result = result.replace('{' + element + '}', format[element])   
 }
 return result
}


console.log('{name} is a {role}'.format({name:'andrei',
role:'teacher'}))
