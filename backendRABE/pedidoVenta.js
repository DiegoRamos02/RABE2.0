const pool = require('../db_conection/db');

class PedidoVenta {
    constructor(id, id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado) {
        this.id = id;
        this.id_cliente = id_cliente;
        this.fecha_hora = fecha_hora;
        this.tipo = tipo;
        this.estado = estado;
        this.total = total;
        this.metodo_pago = metodo_pago;
        this.id_empleado = id_empleado;
    }

    // Método para obtener todos los pedidos/ventas
    static obtenerTodos(callback) {
        pool.query('SELECT * FROM "Pedidos/Ventas"', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener un pedido/venta por su ID
    static obtenerPorId(id, callback) {
        pool.query('SELECT * FROM "Pedidos/Ventas" WHERE "ID de pedido/venta" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    // Método para agregar un nuevo pedido/venta
    static agregarPedidoVenta(pedidoVenta, callback) {
        const { id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado } = pedidoVenta;
        pool.query(
            'INSERT INTO "Pedidos/Ventas" ("ID de cliente", "Fecha y hora del pedido/venta", "Tipo de pedido/venta", "Estado del pedido/venta", "Total", "De método de pago", "ID de empleado") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "ID de pedido/venta"',
            [id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.rows[0]["ID de pedido/venta"]);
                }
            }
        );
    }

    // Método para actualizar un pedido/venta
    static actualizarPedidoVenta(id, nuevoPedidoVenta, callback) {
        const { id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado } = nuevoPedidoVenta;
        pool.query(
            'UPDATE "Pedidos/Ventas" SET "ID de cliente" = $1, "Fecha y hora del pedido/venta" = $2, "Tipo de pedido/venta" = $3, "Estado del pedido/venta" = $4, "Total" = $5, "De método de pago" = $6, "ID de empleado" = $7 WHERE "ID de pedido/venta" = $8 RETURNING *',
            [id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.rows.length > 0) {
                    callback(null, results.rows[0]);
                } else {
                    callback(new Error('No se encontró ningún pedido/venta con el ID proporcionado'), null);
                }
            }
        );
    }

    // Método para eliminar un pedido/venta por ID
    static eliminarPedidoVenta(id, callback) {
        pool.query('DELETE FROM "Pedidos/Ventas" WHERE "ID de pedido/venta" = $1', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al eliminar el pedido/venta: ${error.message}`), null);
            } else {
                callback(null, `Pedido/Venta con ID ${id} eliminado con éxito.`);
            }
        });
    }

    // Método para obtener pedidos/ventas realizados por un empleado
    static obtenerPedidosPorEmpleado(id_empleado, callback) {
        pool.query('SELECT * FROM "Pedidos/Ventas" WHERE "ID de empleado" = $1', [id_empleado], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los pedidos/ventas del empleado: ${error.message}`), null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener pedidos/ventas de un cliente
    static obtenerPedidosPorCliente(id_cliente, callback) {
        pool.query('SELECT * FROM "Pedidos/Ventas" WHERE "ID de cliente" = $1', [id_cliente], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los pedidos/ventas del cliente: ${error.message}`), null);
            } else {
                callback(null, results.rows);
            }
        });
    }
}

module.exports = PedidoVenta;
