const pool = require('../db_conection/db');

class MetodoPago {
    constructor(id, nombreMetodo, descripcion, activo) {
        this.id = id;
        this.nombreMetodo = nombreMetodo;
        this.descripcion = descripcion;
        this.activo = activo;
    }

    // Método para obtener todos los métodos de pago
    static obtenerTodos(callback) {                     // Funciona perfectamente
        pool.query('SELECT * FROM Metodos_de_Pago', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results); // En MySQL, los resultados están directamente en results
            }
        });
    }

    // Método para obtener un método de pago por su ID
    static obtenerPorID(id, callback) {                 // Funciona perfectamente
        pool.query('SELECT * FROM Metodos_de_Pago WHERE ID = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0]); // Accede al primer resultado en MySQL
            } else {
                callback(new Error('Método de pago no encontrado'), null);
            }
        });
    }

    // Método para agregar un nuevo método de pago
    static agregarMetodoPago(metodoPago, callback) {    // Funciona correctamente
        const { nombreMetodo, descripcion, activo } = metodoPago;
        pool.query(
            'INSERT INTO Metodos_de_Pago (Nombre_del_Metodo, Descripcion, Activo) VALUES (?, ?, ?)',
            [nombreMetodo, descripcion, activo],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    // Reconstituimos el objeto del método de pago agregado
                    const nuevoMetodoPago = {
                        id: results.insertId,
                        nombreMetodo,
                        descripcion,
                        activo
                    };
                    callback(null, nuevoMetodoPago);
                }
            }
        );
    }

    // Método para eliminar un método de pago por ID
    static eliminarMetodoPago(id, callback) {        // Funciona correctamente
        pool.query('DELETE FROM Metodos_de_Pago WHERE ID = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.affectedRows > 0) {
                callback(null, `Método de pago con ID ${id} eliminado con éxito.`);
            } else {
                callback(new Error('Método de pago no encontrado'), null);
            }
        });
    }
}

module.exports = MetodoPago;
