const conexion = require('./conexion');

class Departamentos {
    constructor() {
        this.Puesto = '';
        this.Descripción = '';
    }


    static traerDepartamentos() {
        return new Promise((resolve, reject) => {
            conexion.getConnection((err, conexionPool) => {
                if (err) {
                    console.log('Error, SELECT, Tabla departamentos, traerDepartamentos()', err)
                    throw err;
                }
                conexionPool.query('SELECT *FROM departamentos', (err, res, fields) => {
                    if (err) {
                        console.log('ERROR EN QUERY, departamentos.js // función: traerDepartamentos()', err);
                        reject([500, `Hubo un error interno al buscar en la tabla departamentos:` + err]);
                    }
                    resolve(res);
                    conexionPool.release();
                });
            });
        });
    }



}


module.exports = Departamentos;