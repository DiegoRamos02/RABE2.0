const pool = require('../db_conection/db');

class Factura {
    constructor(id, id_cliente, fecha_hora_emision, total, metodo_pago, id_empleado, id_pedido_venta, numero_factura, detalles_adicionales) {
        this.id = id;
        this.id_cliente = id_cliente;
        this.fecha_hora_emision = fecha_hora_emision;
        this.total = total;
        this.metodo_pago = metodo_pago;
        this.id_empleado = id_empleado;
        this.id_pedido_venta = id_pedido_venta;
        this.numero_factura = numero_factura;
        this.detalles_adicionales = detalles_adicionales;
    }

    // Método para obtener todas las facturas
    static obtenerTodas(callback) {
        pool.query('SELECT * FROM Facturas', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener una factura por su ID
    static obtenerPorId(id, callback) {
        pool.query('SELECT * FROM Facturas WHERE "ID de factura" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    // Método para agregar una nueva factura
    static agregarFactura(factura, callback) {
        const { id_cliente, fecha_hora_emision, total, metodo_pago, id_empleado, id_pedido_venta, numero_factura, detalles_adicionales } = factura;
        pool.query(
            'INSERT INTO Facturas ("ID de cliente", "Fecha y hora de emisión", "Total", "Método de pago", "ID de empleado", "ID de pedido/venta", "Número de factura", "Detalles adicionales") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "ID de factura"',
            [id_cliente, fecha_hora_emision, total, metodo_pago, id_empleado, id_pedido_venta, numero_factura, detalles_adicionales],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.rows[0]["ID de factura"]);
                }
            }
        );
    }

    // Método para actualizar una factura
    static actualizarFactura(id, nuevaFactura, callback) {
        const { id_cliente, fecha_hora_emision, total, metodo_pago, id_empleado, id_pedido_venta, numero_factura, detalles_adicionales } = nuevaFactura;
        pool.query(
            'UPDATE Facturas SET "ID de cliente" = $1, "Fecha y hora de emisión" = $2, "Total" = $3, "Método de pago" = $4, "ID de empleado" = $5, "ID de pedido/venta" = $6, "Número de factura" = $7, "Detalles adicionales" = $8 WHERE "ID de factura" = $9 RETURNING *',
            [id_cliente, fecha_hora_emision, total, metodo_pago, id_empleado, id_pedido_venta, numero_factura, detalles_adicionales, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.rows.length > 0) {
                    callback(null, results.rows[0]);
                } else {
                    callback(new Error('No se encontró ninguna factura con el ID proporcionado'), null);
                }
            }
        );
    }

    // Método para eliminar una factura por ID
    static eliminarFactura(id, callback) {
        pool.query('DELETE FROM Facturas WHERE "ID de factura" = $1', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al eliminar la factura: ${error.message}`), null);
            } else {
                callback(null, `Factura con ID ${id} eliminada con éxito.`);
            }
        });
    }

    // Método para obtener facturas asociadas a un pedido/venta específico
    static obtenerFacturasPorPedidoVenta(id_pedido_venta, callback) {
        pool.query('SELECT * FROM Facturas WHERE "ID de pedido/venta" = $1', [id_pedido_venta], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener las facturas del pedido/venta: ${error.message}`), null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener facturas emitidas por un empleado específico
    static obtenerFacturasPorEmpleado(id_empleado, callback) {
        pool.query('SELECT * FROM Facturas WHERE "ID de empleado" = $1', [id_empleado], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener las facturas del empleado: ${error.message}`), null);
            } else {
                callback(null, results.rows);
            }
        });
    }
}

module.exports = Factura;
