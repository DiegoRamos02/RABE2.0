// backendRABE/ticketsController.js

const express = require('express');
const router = express.Router();
const Ticket = require('./tickets'); 

// Obtener todos los tickets
router.get('/', (req, res) => {     // Funciono correctamente
    Ticket.obtenerTodos((error, tickets) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(tickets);
        }
    });
});

// Obtener un ticket por ID
router.get('/:id', (req, res) => {  // Funciono correctamente
    const id = req.params.id;
    Ticket.obtenerPorId(id, (error, ticket) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(ticket);
        }
    });
});

// Agregar un nuevo ticket
router.post('/', (req, res) => {    // Funciono correctamente
    const nuevoTicket = req.body;
    Ticket.agregarTicket(nuevoTicket, (error, ticketId) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json({ id: ticketId, ...nuevoTicket });
        }
    });
});

// Actualizar un ticket
router.put('/:id', (req, res) => {  // Funciono correctamente
    const id = req.params.id;
    const ticketActualizado = req.body;
    Ticket.actualizarTicket(id, ticketActualizado, (error, ticket) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(ticket);
        }
    });
});

// Eliminar un ticket por ID
router.delete('/:id', (req, res) => {   // Funciono correctamente
    const id = req.params.id;
    Ticket.eliminarTicket(id, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

// Obtener todos los tickets de un pedido/venta
router.get('/pedido/:id_pedido_venta', (req, res) => {  // Funciono correctamente
    const id_pedido_venta = req.params.id_pedido_venta;
    Ticket.obtenerTicketsPorPedidoVenta(id_pedido_venta, (error, tickets) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(tickets);
        }
    });
});

module.exports = router;
