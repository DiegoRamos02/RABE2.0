const pool = require('../db_conection/db');
const bcrypt = require('bcrypt');

class Empleado {
    constructor(id, nombre, apellido, correo_electronico, contraseña, puesto, rol, acceso_configuracion) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo_electronico = correo_electronico;
        this.contraseña = contraseña;
        this.puesto = puesto;
        this.rol = rol;
        this.acceso_configuracion = acceso_configuracion;
    }

    // Método para obtener todos los empleados
    static obtenerTodos(callback) {
        pool.query('SELECT * FROM Empleados', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener un empleado por su ID
    static obtenerPorId(id, callback) {
        pool.query('SELECT * FROM Empleados WHERE "ID de empleado" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    // Método para agregar un nuevo empleado
    static agregarEmpleado(empleado, callback) {
        const { nombre, apellido, correo_electronico, contraseña, puesto, rol, acceso_configuracion } = empleado;
        bcrypt.hash(contraseña, 10, (err, hash) => {
            if (err) {
                callback(err, null);
            } else {
                pool.query(
                    'INSERT INTO Empleados ("Nombre", "Apellido", "Correo electrónico", "Contraseña", "Puesto", "Rol", "Acceso a la configuración del sistema") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "ID de empleado"',
                    [nombre, apellido, correo_electronico, hash, puesto, rol, acceso_configuracion],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.rows[0]["ID de empleado"]);
                        }
                    }
                );
            }
        });
    }

    // Método para actualizar un empleado
    static actualizarEmpleado(id, nuevoEmpleado, callback) {
        const { nombre, apellido, correo_electronico, contraseña, puesto, rol, acceso_configuracion } = nuevoEmpleado;
        bcrypt.hash(contraseña, 10, (err, hash) => {
            if (err) {
                callback(err, null);
            } else {
                pool.query(
                    'UPDATE Empleados SET "Nombre" = $1, "Apellido" = $2, "Correo electrónico" = $3, "Contraseña" = $4, "Puesto" = $5, "Rol" = $6, "Acceso a la configuración del sistema" = $7 WHERE "ID de empleado" = $8 RETURNING *',
                    [nombre, apellido, correo_electronico, hash, puesto, rol, acceso_configuracion, id],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else if (results.rows.length > 0) {
                            callback(null, results.rows[0]);
                        } else {
                            callback(new Error('No se encontró ningún empleado con el ID proporcionado'), null);
                        }
                    }
                );
            }
        });
    }

    // Método para eliminar un empleado por ID
    static eliminarEmpleado(id, callback) {
        pool.query('DELETE FROM Empleados WHERE "ID de empleado" = $1', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al eliminar el empleado: ${error.message}`), null);
            } else {
                callback(null, `Empleado con ID ${id} eliminado con éxito.`);
            }
        });
    }

    // Método para obtener pedidos/ventas realizados por un empleado
    static obtenerPedidosPorEmpleado(id, callback) {
        pool.query('SELECT * FROM "Pedidos/Ventas" WHERE "ID de empleado" = $1', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los pedidos/ventas del empleado: ${error.message}`), null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener empleados por puesto
    static obtenerPorPuesto(puesto, callback) {
        pool.query('SELECT * FROM Empleados WHERE "Puesto" = $1', [puesto], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los empleados por puesto: ${error.message}`), null);
            } else {
                callback(null, results.rows);
            }
        });
    }
}

module.exports = Empleado;

