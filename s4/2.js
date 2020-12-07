String.prototype.format = function(format)  {
 let result = this
 for (let i = 0; i < format.length; i++) {
   result = result.replace('{' + i + '}', format[i])   
 }
 return result
}


console.log('{0} is a {1}'.format(['andrei','teacher']))
