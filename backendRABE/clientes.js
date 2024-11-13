// Clientes, Controlador de la tabla

const pool = require('../db_conection/db');

class Cliente {
    constructor(id, nombre, apellido, correo, telefono, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    // Método para obtener todos los clientes
    static obtenerTodos(callback) {             // Funciona correctamente
        pool.query('SELECT * FROM Clientes', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results); // En MySQL, los resultados están directamente en results
            }
        });
    }

    // Método para obtener un cliente por su ID
    static obtenerPorId(id, callback) {         // Funciona correctamente
        pool.query('SELECT * FROM Clientes WHERE ID = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0]); // Accede al primer resultado en MySQL
            } else {
                callback(new Error('Cliente no encontrado'), null);
            }
        });
    }

    // Método para agregar un nuevo cliente
    static agregarCliente(cliente, callback) {  // Funciona correctamente
        const { nombre, apellido, correo, telefono, direccion } = cliente;

        pool.query(
            'INSERT INTO Clientes (Nombre, Apellido, Correo_electronico, Telefono, Direccion) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, correo, telefono, direccion],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    const nuevoCliente = {
                        id: results.insertId,
                        nombre,
                        apellido,
                        correo,
                        telefono,
                        direccion,
                    };
                    callback(null, nuevoCliente); // Devuelve el cliente agregado con el ID insertado
                }
            }
        );
    }

    // Método para actualizar un cliente
    static actualizarCliente(id, nuevoCliente, callback) {      // Funciono correctamente
        const { nombre, apellido, correo, telefono, direccion } = nuevoCliente;

        pool.query(
            'UPDATE Clientes SET Nombre = ?, Apellido = ?, Correo_electronico = ?, Telefono = ?, Direccion = ? WHERE ID = ?',
            [nombre, apellido, correo, telefono, direccion, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.affectedRows > 0) {
                    // Si se actualizaron filas, devolvemos los datos del cliente actualizado
                    const clienteActualizado = { id, nombre, apellido, correo, telefono, direccion };
                    callback(null, clienteActualizado);
                } else {
                    callback(new Error('No se encontró ningún cliente con el ID proporcionado'), null);
                }
            }
        );
    }

    static eliminarCliente(id, callback) {     // Funciono correctamente
        // Primero, eliminamos los pedidos/ventas relacionados con el cliente
        pool.query('DELETE FROM Pedidos_Ventas WHERE ID_de_cliente = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                // Ahora, eliminamos el cliente
                pool.query('DELETE FROM Clientes WHERE ID = ?', [id], (error, results) => {
                    if (error) {
                        callback(error, null);
                    } else if (results.affectedRows > 0) {
                        callback(null, `Cliente con ID ${id} eliminado con éxito.`);
                    } else {
                        callback(new Error('Cliente no encontrado'), null);
                    }
                });
            }
        });
    }
}

module.exports = Cliente;
