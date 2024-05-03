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

    static obtenerTodos(callback) {
        pool.query('SELECT * FROM Clientes', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    static obtenerPorId(id, callback) {
        pool.query('SELECT * FROM "clientes" WHERE "ID" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    static agregarCliente(cliente, callback) {
        const { nombre, apellido, correo, telefono, direccion } = cliente;
        pool.query(
            'INSERT INTO Clientes ("Nombre", "Apellido", "Correo electrónico", "Teléfono", "Dirección") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, apellido, correo, telefono, direccion],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.rows[0]);
                }
            }
        );
    }

    static actualizarCliente(id, nuevoCliente, callback) {
        const { nombre, apellido, correo, telefono, direccion } = nuevoCliente;
        pool.query(
            'UPDATE Clientes SET "Nombre" = $1, "Apellido" = $2, "Correo electrónico" = $3, "Teléfono" = $4, "Dirección" = $5 WHERE "ID" = $6 RETURNING *',
            [nombre, apellido, correo, telefono, direccion, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.rows.length > 0) {
                    callback(null, results.rows[0]);
                } else {
                    callback(new Error('No se encontró ningún cliente con el ID proporcionado'), null);
                }
            }
        );
    }

    static eliminarCliente(id, callback) {
        pool.query('DELETE FROM Clientes WHERE "ID" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, `Cliente con ID ${id} eliminado con éxito.`);
            }
        });
    }
}

module.exports = Cliente;
