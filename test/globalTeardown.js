module.exports = async () => {
  await global._MONGOD_.stop()
}
