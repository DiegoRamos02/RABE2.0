// backendRABE/productosController.js
const express = require('express');
const router = express.Router();
const Producto = require('./productoInventario'); 

// Obtener todos los productos
router.get('/', (req, res) => {     // Funciono correctamente
    Producto.obtenerTodos((error, productos) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(productos);
        }
    });
});

// Obtener productos por categoría
router.get('/categoria/:categoria', (req, res) => {     // Funciono correctamente
    const categoria = req.params.categoria;
    Producto.obtenerCategoria(categoria, (error, productos) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(productos);
        }
    });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    Producto.obtenerPorID(id, (error, producto) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(producto);
        }
    });
});

// Agregar un nuevo producto
router.post('/', (req, res) => {        // Funciono correctamente
    const nuevoProducto = req.body;
    Producto.agregarProducto(nuevoProducto, (error, productoId) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json({ id: productoId, ...nuevoProducto });
        }
    });
});

// Actualizar un producto
router.put('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    const productoActualizado = req.body;
    Producto.actualizarProducto(id, productoActualizado, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    const id = req.params.id;       // Funciono correctamente
    Producto.eliminarProducto(id, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

// Eliminar productos por categoría
router.delete('/categoria/:categoria', (req, res) => {      // Funciono correctamente
    const categoria = req.params.categoria;
    Producto.eliminarProductosPorCategoria(categoria, (error, mensaje) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

// Verificar el stock de un producto
router.get('/:id/stock', (req, res) => {        // Funciono correctamente
    const id = req.params.id;
    Producto.verificarStock(id, (error, stock) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ stock });
        }
    });
});

module.exports = router;
