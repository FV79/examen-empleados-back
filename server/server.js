const express = require('express');
const app = express();
const http = require('http');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
var fetcher = require('express-param');

//CONFIGURACION
require('../configuracion');

let server = http.createServer(app);


app.use(cors({
    origin: ['http://localhost:4200'],
    default: 'http://localhost:4200'
}));


app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(fetcher());

app.use(require('../rutas/empleados-rutas'));
app.use(require('../rutas/departamento-rutas'));

server.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);
    console.log('ESCUCHANDO EL PUERTO: ' + process.env.PORT);
});