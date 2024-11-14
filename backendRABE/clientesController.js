// backendRABE/clientesController.js

const express = require('express');
const router = express.Router();
const Cliente = require('./clientes'); // Importa el modelo de clientes

// Obtener todos los clientes
router.get('/', (req, res) => {     // Funciona correctamente
    Cliente.obtenerTodos((error, clientes) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(clientes);
        }
    });
});

// Obtener un cliente por ID
router.get('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    Cliente.obtenerPorId(id, (error, cliente) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(cliente);
        }
    });
});

// Agregar un nuevo cliente
router.post('/', (req, res) => {        // Funciono correctamente
    const nuevoCliente = req.body;
    Cliente.agregarCliente(nuevoCliente, (error, cliente) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(cliente);
        }
    });
});

// Actualizar un cliente
router.put('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    const nuevoCliente = req.body;
    Cliente.actualizarCliente(id, nuevoCliente, (error, clienteActualizado) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(clienteActualizado);
        }
    });
});

// Eliminar un cliente
router.delete('/:id', (req, res) => {       // Funciono correctamente
    const id = req.params.id;
    Cliente.eliminarCliente(id, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

module.exports = router;
