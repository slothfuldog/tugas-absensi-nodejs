const mysql = require('mysql');

const db = mysql.createPool({
    host : "localhost",
    user: 'user',
    password: 'call911please',
    database: 'users_list'
})

module.exports = { db }