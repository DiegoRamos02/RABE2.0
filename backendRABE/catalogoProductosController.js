    const express = require('express');
    const router = express.Router();
    const CatalogoProductos = require('./catalogoProductos');

    // Obtener todos los productos en el catálogo
    router.get('/', (req, res) => {                 // Funciono correctamente
        CatalogoProductos.obtenerTodos((error, productos) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.json(productos);
            }
        });
    });

    // Obtener un producto específico por su ID
    router.get('/:id', (req, res) => {              // Funciono correctamente
        const id = req.params.id;
        CatalogoProductos.obtenerPorId(id, (error, producto) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.json(producto);
            }
        });
    });

    // Buscar productos por categoría
    router.get('/categoria/:categoria', (req, res) => {     // Funciono correctamente
        const categoria = req.params.categoria;
        CatalogoProductos.buscarPorCategoria(categoria, (error, productos) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.json(productos);
            }
        });
    });

    // Agregar un nuevo producto
    router.post('/', (req, res) => {    // Funciono correctamente
        const nuevoProducto = req.body;
        CatalogoProductos.agregarProducto(nuevoProducto, (error, productoId) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(201).json({ id: productoId });
            }
        });
    });

    // Actualizar un producto por su ID
    router.put('/:id', (req, res) => {      // Funciono correctamente
        const id = req.params.id;
        const productoActualizado = req.body;
        CatalogoProductos.actualizarProducto(id, productoActualizado, (error, mensaje) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.json({ mensaje });
            }
        });
    });

    // Eliminar un producto por su ID
    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        CatalogoProductos.eliminarProducto(id, (error, mensaje) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.json({ mensaje });
            }
        });
    });

    module.exports = router;
