class SimpleObject {
 constructor (name) {
   this.name = name
 }

 doStuff () {
   console.log(`${this.name} is doing stuff`)
 }
}

module.exports = SimpleObject