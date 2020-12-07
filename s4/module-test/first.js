const state = require('./state')

const doStuff = () => {
  state.setValue('somekey', 'somevalue')
}

module.exports = {
  doStuff
}