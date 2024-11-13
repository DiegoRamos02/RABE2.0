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
    static obtenerTodos(callback) {         // Funciona correctamente
        pool.query('SELECT * FROM Tickets', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results); // En MySQL, los resultados están directamente en results
            }
        });
    }

    // Método para obtener un ticket por su ID
    static obtenerPorId(id, callback) {         // Funciona correctamente
        pool.query('SELECT * FROM Tickets WHERE ID_de_ticket = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0]); // Accede al primer resultado en MySQL
            } else {
                callback(new Error('Ticket no encontrado'), null);
            }
        });
    }

    // Método para agregar un nuevo ticket
    static agregarTicket(ticket, callback) {    // Funciono correctamente
        const { id_pedido_venta, fecha_hora_emision, detalles } = ticket;

        // Primero, obtenemos el total del pedido/venta
        pool.query('SELECT Total FROM Pedidos_Ventas WHERE ID_de_pedido_venta = ?', [id_pedido_venta], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                const total = results[0].Total;

                // Luego, insertamos el nuevo ticket con el total obtenido
                pool.query(
                    'INSERT INTO Tickets (ID_de_pedido_venta, Fecha_y_hora_de_emision, Total, Detalles) VALUES (?, ?, ?, ?)',
                    [id_pedido_venta, fecha_hora_emision, total, detalles],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.insertId); // En MySQL, obtenemos el ID insertado con insertId
                        }
                    }
                );
            } else {
                callback(new Error('Pedido/venta no encontrado'), null);
            }
        });
    }

    // Método para actualizar un ticket
    static actualizarTicket(id, nuevoTicket, callback) {    // Funciona correctamente
        const { id_pedido_venta, fecha_hora_emision, total, detalles } = nuevoTicket;

        pool.query(
            'UPDATE Tickets SET ID_de_pedido_venta = ?, Fecha_y_hora_de_emision = ?, Total = ?, Detalles = ? WHERE ID_de_ticket = ?',
            [id_pedido_venta, fecha_hora_emision, total, detalles, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.affectedRows > 0) {
                    // Si se actualizó correctamente, devolvemos los datos del ticket actualizado
                    const ticketActualizado = { id, id_pedido_venta, fecha_hora_emision, total, detalles };
                    callback(null, ticketActualizado);
                } else {
                    callback(new Error('No se encontró ningún ticket con el ID proporcionado'), null);
                }
            }
        );
    } 

    // Método para eliminar un ticket por ID
    static eliminarTicket(id, callback) {
        pool.query('DELETE FROM Tickets WHERE ID_de_ticket = ?', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al eliminar el ticket: ${error.message}`), null);
            } else if (results.affectedRows > 0) {
                callback(null, `Ticket con ID ${id} eliminado con éxito.`);
            } else {
                callback(new Error('Ticket no encontrado'), null);
            }
        });
    }

    // Método para obtener tickets asociados a un pedido/venta específico
    static obtenerTicketsPorPedidoVenta(id_pedido_venta, callback) {        // Funciona perfectamente
        pool.query('SELECT * FROM Tickets WHERE ID_de_pedido_venta = ?', [id_pedido_venta], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los tickets del pedido/venta: ${error.message}`), null);
            } else {
                callback(null, results); // En MySQL, los resultados están directamente en results
            }
        });
    }
}

module.exports = Ticket;
