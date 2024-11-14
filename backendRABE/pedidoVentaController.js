const express = require('express');
const router = express.Router();
const PedidoVenta = require('./pedidoVenta'); // Importa el modelo de pedidos/ventas

// Obtener todos los pedidos/ventas
router.get('/', (req, res) => {     // Funciono correctamente
    PedidoVenta.obtenerTodos((error, pedidos) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(pedidos);
        }
    });
});

// Obtener un pedido/venta por ID
router.get('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    PedidoVenta.obtenerPorId(id, (error, pedido) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(pedido);
        }
    });
});

// Agregar un nuevo pedido/venta
router.post('/', (req, res) => {        // Funciono correctamente
    const nuevoPedido = req.body;
    PedidoVenta.agregarPedidoVenta(nuevoPedido, (error, pedidoId) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json({ id: pedidoId });
        }
    });
});

// Actualizar un pedido/venta
router.put('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    const nuevoPedido = req.body;
    PedidoVenta.actualizarPedidoVenta(id, nuevoPedido, (error, pedidoActualizado) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(pedidoActualizado);
        }
    });
});

// Eliminar un pedido/venta por ID
router.delete('/:id', (req, res) => {       // Funciono correctamente
    const id = req.params.id;
    PedidoVenta.eliminarPedidoVenta(id, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

// Obtener pedidos/ventas realizados por un empleado
router.get('/empleado/:id_empleado', (req, res) => {        // Funciono correctamente
    const id_empleado = req.params.id_empleado;
    PedidoVenta.obtenerPedidosPorEmpleado(id_empleado, (error, pedidos) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(pedidos);
        }
    });
});

// Obtener pedidos/ventas de un cliente
router.get('/cliente/:id_cliente', (req, res) => {      // Funciono correctamente
    const id_cliente = req.params.id_cliente;
    PedidoVenta.obtenerPedidosPorCliente(id_cliente, (error, pedidos) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(pedidos);
        }
    });
});

module.exports = router;
