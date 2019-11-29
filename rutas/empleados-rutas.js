const express = require('express');
const app = express();

const Empleados = require('../modelos/empleados');

app.get('/empleados', async(req, res) => {
    try {
        let mostrarEmpleados = await Empleados.traerEmpleados();

        res.json({
            resupuesta: true,
            mostrarEmpleados
        })

    } catch (error) {
        console.log('error en mostrar clientes', error);
        res.status(error[0]).json({
            resupuesta: false,
            err: [
                error[1],
            ]
        });
    }
});


app.post('/empleadonuevo', async(req, res) => {
    try {
        const empleado = new Empleados();
        console.log('aqui', req.body);
        empleado.Nombre = req.body.Nombre;
        empleado.ApPaterno = req.body.ApPaterno;
        empleado.ApMaterno = req.body.ApMaterno;
        empleado.FecNac = req.body.FecNac;
        empleado.Departamento = req.body.Departamento;
        empleado.Sueldo = req.body.Sueldo;

        await empleado.EmpleadoNuevo();

        res.json({
            respuesta: true,
            empleado
        });
    } catch (error) {
        console.log('Error al crear un cliente', error);
        res.status(error[0]).json({
            respuesta: false,
            mensaje: 'No se agrego el cliente',
            err: [
                error[1]
            ]
        });
        console.log('Error al agregar cliente', error);
    }
});

app.delete('/empleadoeliminar/:clave', async(req, res) => {
    try {
        let clave = req.params.clave;
        console.log(clave);

        let empleadoEli = await Empleados.buscarEmpleadoClave(clave);
        await empleadoEli.empleadoEliminar();

        res.json({
            respuesta: true
        });

    } catch (error) {
        console.log('ERROR EN udmeliminar', error);
        res.status(error[0]).json({
            respuesta: false,
            err: [
                error[1],
            ]
        });
    }

});


app.put('/modificarempleado/:clave', async(req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);
        let clave = req.params.clave;
        let empleado = await Empleados.buscarEmpleadoClave(clave);

        empleado.Nombre = req.body.Nombre;
        empleado.ApPaterno = req.body.ApPaterno;
        empleado.ApMaterno = req.body.ApMaterno;
        empleado.Departamento = req.body.Departamento;
        empleado.Sueldo = req.body.Sueldo;
        empleado.FecNac = req.body.FecNac;

        await empleado.empleadosModificar();

        clienteModi = await Empleados.buscarEmpleadoClave(clave);

        res.json({
            respuesta: true,
        });

    } catch (error) {
        console.log('error en modificar', error);
        res.status(error[0]).json({
            respuesta: false,
            err: [
                error[1]
            ]
        });
    }

});


module.exports = app;