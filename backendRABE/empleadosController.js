const express = require('express');
const router = express.Router();
const Empleado = require('./empleados');

// Obtener todos los empleados
router.get('/', (req, res) => {     // Funciono correctamente
    Empleado.obtenerTodos((error, empleados) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(empleados);
        }
    });
});

// Obtener un empleado por ID
router.get('/:id', (req, res) => {    // funciono correctamente
    const id = req.params.id;
    Empleado.obtenerPorId(id, (error, empleado) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(empleado);
        }
    });
});

// Agregar nuevo empleado
router.post('/', (req, res) => {    // Funciono correctamente
    const nuevoEmpleado = req.body;
    Empleado.agregarEmpleado(nuevoEmpleado, (error, id) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json({ mensaje: `Empleado agregado con ID ${id}` });
        }
    });
});

// Actualizar un empleado
router.put('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    const nuevoEmpleado = req.body;
    Empleado.actualizarEmpleado(id, nuevoEmpleado, (error, empleadoActualizado) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(empleadoActualizado);
        }
    });
});

// Eliminar un empleado
router.delete('/:id', (req, res) => {       // Funciona correctamente
    const id = req.params.id;
    Empleado.eliminarEmpleado(id, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

// Obtener pedidos/ventas de un empleado específico
router.get('/:id/pedidos', (req, res) => {              // Funciono correctamente
    const id = req.params.id;
    Empleado.obtenerPedidosPorEmpleado(id, (error, pedidos) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(pedidos);
        }
    });
});

// Obtener empleados por puesto
router.get('/puesto/:puesto', (req, res) => {    // Funciono correctamente
    const puesto = req.params.puesto;   
    Empleado.obtenerPorPuesto(puesto, (error, empleados) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(empleados);
        }
    });
});

module.exports = router;
