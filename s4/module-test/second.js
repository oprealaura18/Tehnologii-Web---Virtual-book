const state = require('./state')

const doStuff = () => {
  const value = state.getValue('somekey')
  console.log(`state value was ${value}`)
}

module.exports = {
  doStuff
}