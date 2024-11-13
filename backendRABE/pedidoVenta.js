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
    static obtenerTodos(callback) {                 // Funciona correctamente
        pool.query('SELECT * FROM Pedidos_Ventas', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results); // En MySQL, los resultados están directamente en results
            }
        });
    }

    // Método para obtener un pedido/venta por su ID
    static obtenerPorId(id, callback) {                 // Funciona correctamente
        pool.query('SELECT * FROM Pedidos_Ventas WHERE ID_de_pedido_venta = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0]); // Accede al primer resultado en MySQL
            } else {
                callback(new Error('Pedido/venta no encontrado'), null);
            }
        });
    }

    // Método para agregar un nuevo pedido/venta
    static agregarPedidoVenta(pedidoVenta, callback) {     // Funciona correctamente
        const { id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado } = pedidoVenta;

        pool.query(
            'INSERT INTO Pedidos_Ventas (ID_de_cliente, Fecha_y_hora_del_pedido_venta, Tipo_de_pedido_venta, Estado_del_pedido_venta, Total, De_metodo_de_pago, ID_de_empleado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, results.insertId); // En MySQL, obtenemos el ID insertado con insertId
                }
            }
        );
    }

    // Método para actualizar un pedido/venta
    static actualizarPedidoVenta(id, nuevoPedidoVenta, callback) { // Funciona correctamente
        const { id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado } = nuevoPedidoVenta;

        pool.query(
            'UPDATE Pedidos_Ventas SET ID_de_cliente = ?, Fecha_y_hora_del_pedido_venta = ?, Tipo_de_pedido_venta = ?, Estado_del_pedido_venta = ?, Total = ?, De_metodo_de_pago = ?, ID_de_empleado = ? WHERE ID_de_pedido_venta = ?',
            [id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.affectedRows > 0) {
                    // Retorna el objeto con los datos actualizados
                    callback(null, { id, id_cliente, fecha_hora, tipo, estado, total, metodo_pago, id_empleado });
                } else {
                    callback(new Error('No se encontró ningún pedido/venta con el ID proporcionado'), null);
                }
            }
        );
    }

    // Método para eliminar un pedido/venta por ID
    static eliminarPedidoVenta(id, callback) {      // Funciona correctamente
        pool.query('DELETE FROM Pedidos_Ventas WHERE ID_de_pedido_venta = ?', [id], (error, results) => {
            if (error) {
                callback(new Error(`Error al eliminar el pedido/venta: ${error.message}`), null);
            } else if (results.affectedRows > 0) {
                callback(null, `Pedido/Venta con ID ${id} eliminado con éxito.`);
            } else {
                callback(new Error('Pedido/Venta no encontrado'), null);
            }
        });
    }

    // Método para obtener pedidos/ventas realizados por un empleado
    static obtenerPedidosPorEmpleado(id_empleado, callback) {       // Funciona correctamente
        pool.query('SELECT * FROM Pedidos_Ventas WHERE ID_de_empleado = ?', [id_empleado], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los pedidos/ventas del empleado: ${error.message}`), null);
            } else {
                callback(null, results); // En MySQL, los resultados están directamente en results
            }
        });
    }

    // Método para obtener pedidos/ventas de un cliente
    static obtenerPedidosPorCliente(id_cliente, callback) {     // Funciona correctamente
        pool.query('SELECT * FROM Pedidos_Ventas WHERE ID_de_cliente = ?', [id_cliente], (error, results) => {
            if (error) {
                callback(new Error(`Error al obtener los pedidos/ventas del cliente: ${error.message}`), null);
            } else {
                callback(null, results); // En MySQL, los resultados están directamente en results
            }
        });
    }
}

module.exports = PedidoVenta;
