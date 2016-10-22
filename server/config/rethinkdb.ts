const DSRethinkDBAdapter = require('js-data-rethinkdb')
// Create an instance of RethinkDBAdapter
export const adapter = new DSRethinkDBAdapter({
  rOpts: {
    host: process.env.RETHINKDB_HOST,
    port: process.env.DB_PORT,
    db: process.env.RETHINKDB_DB
    // authKey: process.env.DB_AUTH_KEY
  }
})
