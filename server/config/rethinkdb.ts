export let rethinkdbconfig: IRethinkDBConfig = {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: process.env.RETHINKDB_PORT || 28015,
    db: process.env.RETHINKDB_DB || 'beebee'
}

export interface IRethinkDBConfig {
    host: string
    port: number
    db: string
}
