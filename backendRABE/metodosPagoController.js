const express = require('express');
const router = express.Router();
const MetodoPago = require('./metodosPago'); // Importa el modelo de métodos de pago

// Obtener todos los métodos de pago
router.get('/', (req, res) => {         // Funciono correctamente
    MetodoPago.obtenerTodos((error, metodos) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(metodos);
        }
    });
});

// Obtener un método de pago por ID
router.get('/:id', (req, res) => {      // Funcona correctamente
    const id = req.params.id;
    MetodoPago.obtenerPorID(id, (error, metodo) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(metodo);
        }
    });
});

// Agregar un nuevo método de pago
router.post('/', (req, res) => {        // Funciona correctamente
    const nuevoMetodo = req.body;
    MetodoPago.agregarMetodoPago(nuevoMetodo, (error, metodoAgregado) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(metodoAgregado);
        }
    });
});

// Eliminar un método de pago por ID
router.delete('/:id', (req, res) => {       // Funciona correctamente
    const id = req.params.id;
    MetodoPago.eliminarMetodoPago(id, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

module.exports = router;
