import { EventEmitter } from 'events'
const { MongoMemoryServer } = require('mongodb-memory-server')

EventEmitter.defaultMaxListeners = Infinity

global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat

const mongod = new MongoMemoryServer({
  instance: {
    dbName: 'rest-sandbox-test'
  },
  autoStart: false
})

module.exports = async () => {
  console.log('Mongod Started ', mongod.isRunning)
  if (!mongod.isRunning) {
    console.log('Mongod starting...')
    await mongod.start()
  }

  const mongoUri = await mongod.getConnectionString()
  console.log('Global Config has been setup')

  global._MONGO_DB_NAME_ = 'rest-sandbox-test'
  global._MONGO_URI_ = mongoUri
  global._MONGOD_ = mongod
}
