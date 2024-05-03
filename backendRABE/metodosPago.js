const pool = require('../db_conection/db');

class MetodoPago {
    constructor(id, nombreMetodo, descripcion, activo) {
        this.id = id;
        this.nombreMetodo = nombreMetodo;
        this.descripcion = descripcion;
        this.activo = activo;
    }

    // Método para obtener todos los métodos de pago
    static obtenerTodos(callback) {
        pool.query('SELECT * FROM "Métodos de Pago"', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener un método de pago por su ID
    static obtenerPorID(id, callback) {
        pool.query('SELECT * FROM "Métodos de Pago" WHERE "ID" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    // Método para agregar un nuevo método de pago
    static agregarMetodoPago(metodoPago, callback) {
        const { nombreMetodo, descripcion, activo } = metodoPago;
        pool.query(
            'INSERT INTO "Métodos de Pago" ("Nombre del Método", "Descripción", "Activo") VALUES ($1, $2, $3) RETURNING *',
            [nombreMetodo, descripcion, activo],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.rows[0]);
                }
            }
        );
    }

    // Método para actualizar un método de pago
    static actualizarMetodoPago(id, nuevoMetodoPago, callback) {
        const { nombreMetodo, descripcion, activo } = nuevoMetodoPago;
        pool.query(
            'UPDATE "Métodos de Pago" SET "Nombre del Método" = $1, "Descripción" = $2, "Activo" = $3 WHERE "ID" = $4 RETURNING *',
            [nombreMetodo, descripcion, activo, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.rows[0]);
                }
            }
        );
    }

    // Método para eliminar un método de pago
    static eliminarMetodoPago(id, callback) {
        pool.query('DELETE FROM "Métodos de Pago" WHERE "ID" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, `Método de pago con ID ${id} eliminado con éxito.`);
            }
        });
    }
}

module.exports = MetodoPago;
