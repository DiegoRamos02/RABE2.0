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
    static obtenerTodos(callback) {             // Funciona correctamente
        pool.query('SELECT * FROM Empleados', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results); // Los resultados se devuelven directamente
            }
        });
    }

    // Método para obtener un empleado por su ID
    static obtenerPorId(id, callback) {             // Funciona correctamente
        pool.query('SELECT * FROM Empleados WHERE ID_de_empleado = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0]); // En MySQL, accedemos al primer resultado en results[0]
            } else {
                callback(new Error('Empleado no encontrado'), null);
            }
        });
    }

    // Método para agregar un nuevo empleado
    static agregarEmpleado(empleado, callback) {        // Funciono correctamente
        const { nombre, apellido, correo_electronico, contraseña, puesto, rol, acceso_configuracion } = empleado;
        bcrypt.hash(contraseña, 10, (err, hash) => {
            if (err) {
                callback(err, null);
            } else {
                pool.query(
                    'INSERT INTO Empleados (Nombre, Apellido, Correo_electronico, Contrasena, Puesto, Rol, Acceso_a_la_configuracion_del_sistema) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [nombre, apellido, correo_electronico, hash, puesto, rol, acceso_configuracion],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.insertId); // En MySQL, obtenemos el ID insertado con insertId
                        }
                    }
                );
            }
        });
    }

    // Método para actualizar un empleado
    static actualizarEmpleado(id, nuevoEmpleado, callback) {       // Funciono correctamente
        const { nombre, apellido, correo_electronico, contraseña, puesto, rol, acceso_configuracion } = nuevoEmpleado;
        bcrypt.hash(contraseña, 10, (err, hash) => {
            if (err) {
                callback(err, null);
            } else {
                pool.query(
                    'UPDATE Empleados SET Nombre = ?, Apellido = ?, Correo_electronico = ?, Contrasena = ?, Puesto = ?, Rol = ?, Acceso_a_la_configuracion_del_sistema = ? WHERE ID_de_empleado = ?',
                    [nombre, apellido, correo_electronico, hash, puesto, rol, acceso_configuracion, id],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else if (results.affectedRows > 0) {
                            callback(null, { id, nombre, apellido, correo_electronico, puesto, rol, acceso_configuracion });
                        } else {
                            callback(new Error('Empleado no encontrado'), null);
                        }
                    }
                );
            }
        });
    }

    // Método para eliminar un empleado por ID
    static eliminarEmpleado(id, callback) {     // Funciona correctamente
        pool.query('DELETE FROM Empleados WHERE ID_de_empleado = ?', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al eliminar el empleado: ${error.message}`), null);
            } else if (results.affectedRows > 0) {
                callback(null, `Empleado con ID ${id} eliminado con éxito.`);
            } else {
                callback(new Error('Empleado no encontrado'), null);
            }
        });
    }

    // Método para obtener pedidos/ventas realizados por un empleado
    static obtenerPedidosPorEmpleado(id, callback) {                    // Funciona correctamente
        pool.query('SELECT * FROM Pedidos_Ventas WHERE ID_de_empleado = ?', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los pedidos/ventas del empleado: ${error.message}`), null);
            } else {
                callback(null, results);
            }
        });
    }

    // Método para obtener empleados por puesto
    static obtenerPorPuesto(puesto, callback) {     // Funciona correctamente
        pool.query('SELECT * FROM Empleados WHERE Puesto = ?', [puesto], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los empleados por puesto: ${error.message}`), null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = Empleado;
