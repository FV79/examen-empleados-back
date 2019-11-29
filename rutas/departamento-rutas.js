const express = require('express');
const app = express();

const Departamentos = require('../modelos/departamentos');

app.get('/departamentos', async(req, res) => {
    try {
        let mostrarDeparta = await Departamentos.traerDepartamentos();

        res.json({
            resupuesta: true,
            mostrarDeparta
        })

    } catch (error) {
        res.status(error[0]).json({
            resupuesta: false,
            err: [
                error[1],
            ]
        });
    }
});




module.exports = app;