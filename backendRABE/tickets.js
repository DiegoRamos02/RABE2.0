const pool = require('../db_conection/db');

class Ticket {
    constructor(id, id_pedido_venta, fecha_hora_emision, total, detalles) {
        this.id = id;
        this.id_pedido_venta = id_pedido_venta;
        this.fecha_hora_emision = fecha_hora_emision;
        this.total = total;
        this.detalles = detalles;
    }

    // Método para obtener todos los tickets
    static obtenerTodos(callback) {
        pool.query('SELECT * FROM Tickets', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener un ticket por su ID
    static obtenerPorId(id, callback) {
        pool.query('SELECT * FROM Tickets WHERE "ID de ticket" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    // Método para agregar un nuevo ticket
    static agregarTicket(ticket, callback) {
        const { id_pedido_venta, fecha_hora_emision, detalles } = ticket;
        // Primero, obtenemos el total del pedido/venta
        pool.query('SELECT "Total" FROM "Pedidos/Ventas" WHERE "ID de pedido/venta" = $1', [id_pedido_venta], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                const total = results.rows[0]["Total"];
                // Luego, insertamos el nuevo ticket con el total obtenido
                pool.query(
                    'INSERT INTO Tickets ("ID de pedido/venta", "Fecha y hora de emisión", "Total", "Detalles") VALUES ($1, $2, $3, $4) RETURNING "ID de ticket"',
                    [id_pedido_venta, fecha_hora_emision, total, detalles],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.rows[0]["ID de ticket"]);
                        }
                    }
                );
            }
        });
    }


    // Método para actualizar un ticket
    static actualizarTicket(id, nuevoTicket, callback) {
        const { id_pedido_venta, fecha_hora_emision, total, detalles } = nuevoTicket;
        pool.query(
            'UPDATE Tickets SET "ID de pedido/venta" = $1, "Fecha y hora de emisión" = $2, "Total" = $3, "Detalles" = $4 WHERE "ID de ticket" = $5 RETURNING *',
            [id_pedido_venta, fecha_hora_emision, total, detalles, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.rows.length > 0) {
                    callback(null, results.rows[0]);
                } else {
                    callback(new Error('No se encontró ningún ticket con el ID proporcionado'), null);
                }
            }
        );
    }

    // Método para eliminar un ticket por ID
    static eliminarTicket(id, callback) {
        pool.query('DELETE FROM Tickets WHERE "ID de ticket" = $1', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al eliminar el ticket: ${error.message}`), null);
            } else {
                callback(null, `Ticket con ID ${id} eliminado con éxito.`);
            }
        });
    }

    // Método para obtener tickets asociados a un pedido/venta específico
    static obtenerTicketsPorPedidoVenta(id_pedido_venta, callback) {
        pool.query('SELECT * FROM Tickets WHERE "ID de pedido/venta" = $1', [id_pedido_venta], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los tickets del pedido/venta: ${error.message}`), null);
            } else {
                callback(null, results.rows);
            }
        });
    }
}

module.exports = Ticket;
