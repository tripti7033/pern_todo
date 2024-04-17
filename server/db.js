require('dotenv').config()
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    
})
module.exports = pool;

 // user: 'postgres',
    // host: 'localhost',
    // port: 5432,
    // password: 'Tripti907@',
    // database: 'todoDb'