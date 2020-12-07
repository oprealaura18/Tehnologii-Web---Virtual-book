const nothing=require('./nothing')
const SimpleObject=require('./simple-object')
const first=require('./first')
const second=require('./second')


nothing.doNothing()

const so0=new SimpleObject('some object')
so0.doStuff()

first.doStuff()
second.doStuff()

