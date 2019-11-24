const NodeEnvironment = require('jest-environment-node')

module.exports = class MongoEnvironment extends NodeEnvironment {
  async setup () {
    console.log('Setting up MongoDB Memory Server in Test Environment ', global._MONGO_DB_NAME_, global._MONGO_URI_)
    this.global._MONGO_URI_ = global._MONGO_URI_
    this.global._MONGO_DB_NAME_ = global._MONGO_DB_NAME_
    await super.setup()
  }

  async teardown () {
    console.log('Tearing down MongoDB Test Environment')
    await super.teardown()
  }

  runScript (script) {
    return super.runScript(script)
  }
}
