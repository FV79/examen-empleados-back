const mysql = require('mysql');

let conexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mexico123',
    database: 'empleados',
});

module.exports = conexion;