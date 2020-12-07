class State {
 constructor () {
   this.state = {}
 }

 getValue (key) {
   return this.state[key]
 }

 setValue (key, value) {
   this.state[key] = value
 }
}

const state = new State()

module.exports = state