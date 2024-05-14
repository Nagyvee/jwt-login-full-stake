const {createPool} = require('mysql2');
require('dotenv').config();

const pool = createPool({
    host:process.env.HOST,
    user: process.env.USER,
    database:process.env.DATABASE,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 30,
})

module.exports = pool