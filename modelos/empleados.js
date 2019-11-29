const conexion = require('./conexion');

class Empleados {
    constructor() {
        this.Clave_Emp = '';
        this.Nombre = '';
        this.ApPaterno = '';
        this.ApMaterno = '';
        this.FecNac = '';
        this.Departamento = '';
        this.Sueldo = '';
        this.status = '';
    }


    static traerEmpleados() {
        return new Promise((resolve, reject) => {
            conexion.getConnection((err, conexionPool) => {
                if (err) {
                    console.log('Error, SELECT, Tabla empleados, traerEmpleados()', err)
                    throw err;
                }
                conexionPool.query(`SELECT Clave_Emp, Nombre, ApPaterno, ApMaterno, FecNac, Departamento, Sueldo, Descripcion  FROM empleados
                                    INNER JOIN departamentos ON departamentos.Puesto = empleados.Departamento
                                    WHERE STATUS = 1
                                    ORDER BY Nombre ASC`, (err, res, fields) => {
                    if (err) {
                        console.log('ERROR EN QUERY, empleados.js // función: traerEmpleados()', err);
                        reject([500, `Hubo un error interno al buscar en la tabla empleados:` + err]);
                    }
                    resolve(res);
                    conexionPool.release();
                });
            });
        });
    }

    EmpleadoNuevo() {
        return new Promise((resolve, reject) => {
            let empleadoNuevo = [
                this.Nombre,
                this.ApPaterno,
                this.ApMaterno,
                this.Departamento,
                this.Sueldo,
                this.FecNac,
            ];
            conexion.getConnection((err, conexionPool) => {
                if (err) {
                    console.log('Error tabla empleados, INSERT, EmpleadoNuevo', err)
                    throw err;
                }
                conexionPool.query('INSERT INTO empleados (Nombre,ApPaterno,ApMaterno,Departamento,Sueldo,FecNac) VALUES(?,?,?,?,?,?)', empleadoNuevo, (err, res) => {
                    if (err) {
                        console.log('ERROR EN QUERY, empleados.js // funcion: EmpleadoNuevo()', err);
                        reject([500, 'Hubo un error interno al insertar un nuevo empleado: ' + err]);
                    }
                    resolve(res);
                    conexionPool.release();
                });
            });
        });
    }

    empleadoEliminar() {
        return new Promise((resolve, reject) => {
            conexion.getConnection((err, conexionPool) => {
                if (err) {
                    console.log('Error tabla en la empleados, DELETE, empleadoEliminar', err)
                    throw err;
                }
                let consulta = conexionPool.query(`DELETE FROM empleados WHERE Clave_Emp = ${this.Clave_Emp}`, (err, res) => {
                    if (err) {
                        console.log('ERROR EN QUERY, empleados.js // funcion: empleadoEliminar(Clave_Emp)', err);
                        reject([500, 'Hubo un error al eliminar la empleado' + err]);
                    }
                    // console.log(consulta);
                    resolve(res);
                    conexionPool.release();
                });
            });
        });
    }

    static buscarEmpleadoClave(clave) {
        return new Promise((resolve, reject) => {
            conexion.getConnection((err, conexionPool) => {
                if (err) {
                    console.log('Error tabla empleados, Select, buscarEmpleadoClave()', err)
                    throw err;
                }
                conexionPool.query(`SELECT Clave_Emp, Nombre, ApPaterno, ApMaterno, FecNac, Departamento, Sueldo, status FROM empleados WHERE Clave_Emp = ${clave} and status = 1`, (err, res) => {
                    if (err) {
                        console.log('ERROR EN QUERY, empleado.js // funcion: buscarEmpleadoClave(clave)', err);
                        reject([500, 'Hubo un error interno al buscar el empleado: ' + err]);
                    }
                    if (res.length == 0) {
                        console.log('Error', err);
                        return reject([400, 'No existe un cliente con la id: ' + clave]);
                    }

                    let empleado = new Empleados();
                    empleado.Clave_Emp = res[0].Clave_Emp;
                    empleado.Nombre = res[0].Nombre;
                    empleado.ApPaterno = res[0].ApPaterno;
                    empleado.ApMaterno = res[0].ApMaterno;
                    empleado.FecNac = res[0].FecNac;
                    empleado.Departamento = res[0].Departamento;
                    empleado.Sueldo = res[0].Sueldo;
                    empleado.status = res[0].status;

                    resolve(empleado);
                    conexionPool.release();
                });
            });

        });
    }


    empleadosModificar() {
        return new Promise((resolve, reject) => {
            let empleado = [
                this.Nombre,
                this.ApPaterno,
                this.ApMaterno,
                this.Departamento,
                this.Sueldo,
                this.FecNac,
            ];
            conexion.getConnection((err, conexionPool) => {
                if (err) {
                    console.log('Error tabla empleados, UPDATE, productoModificar', err)
                    throw err;
                }
                let consulta = conexionPool.query(`UPDATE empleados set Nombre = ?, ApPaterno = ?, ApMaterno = ?, Departamento = ?, Sueldo = ?, FecNac = ?  WHERE Clave_Emp =  ${this.Clave_Emp} `, empleado, (err, res) => {
                    if (err) {
                        console.log('ERROR EN QUERY, empleados.js // funcion: empleadosModificar()');
                        reject([500, 'Hubo un error interno al hacer la modificacion del empleado: ' + err]);
                    }
                    // console.log(consulta);
                    resolve(res);
                    conexionPool.release();
                });
            });

        });
    }


}


module.exports = Empleados;