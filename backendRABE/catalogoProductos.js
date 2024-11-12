// Backend catalogo de productos
const pool = require('../db_conection/db');

class CatalogoProductos {
    constructor(id, nombre, descripcion, precio, cantidadDisponible, categoria, idProductoInventario) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidadDisponible = cantidadDisponible;
        this.categoria = categoria;
        this.idProductoInventario = idProductoInventario;
    }

    static obtenerTodos(callback) {     // Funciono correctamente
        console.log("Iniciando consulta de obtenerTodos...");
        const query = `SELECT * FROM Catalogo_de_Productos;`;
        pool.query(query, (error, results) => {
            if (error) {
                console.error("Error al obtener todos los productos:", error);
                callback(error, null);
            } else {
                console.log("Resultados de Catalogo_de_Productos:", results);
                callback(null, results);
            }
        });
    }

    static obtenerPorId(id, callback) {     // Funciono correctamente
        const query = `
        SELECT cp.*, pi.Stock_disponible
        FROM Catalogo_de_Productos cp
        LEFT JOIN Productos_Inventario pi ON cp.ID_de_producto_en_inventario = pi.ID_de_producto
        WHERE cp.ID = ?
    `;
        pool.query(query, [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                console.log("Resultados de la consulta obtenerPorId:", results); // Log para verificar resultados
                callback(null, results[0]);
            }
        });
    }

    static buscarPorCategoria(categoria, callback) {    // Funciono correctamente
        const query = `
            SELECT cp.*, pi.Stock_disponible
            FROM Catalogo_de_Productos cp
            LEFT JOIN Productos_Inventario pi ON cp.ID_de_producto_en_inventario = pi.ID_de_producto
            WHERE cp.Categoria = ?
        `;
        pool.query(query, [categoria], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    }

    static ordenarProductos(criterio, categoria, callback) {
        let orderByClause = '';
        switch (criterio) {
            case 'nombre':
                orderByClause = 'cp.Nombre';
                break;
            case 'precio':
                orderByClause = 'cp.Precio';
                break;
            case 'categoria':
                orderByClause = 'cp.Categoria';
                break;
            default:
                orderByClause = 'cp.Nombre';
        }

        const query = `
        SELECT cp.*, pi.Stock_disponible
        FROM Catalogo_de_Productos cp
        INNER JOIN Productos_Inventario pi ON cp.ID_de_producto_en_inventario = pi.ID_de_producto
        WHERE cp.Categoria = ?
        ORDER BY ${orderByClause}
    `;

        pool.query(query, [categoria], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    }

    static obtenerCantidadDisponible(id, callback) { // Funciona correctamente
        const query = `
        SELECT pi.Stock_disponible
        FROM Catalogo_de_Productos cp
        INNER JOIN Productos_Inventario pi ON cp.ID_de_producto_en_inventario = pi.ID_de_producto
        WHERE cp.ID = ?
    `;
        pool.query(query, [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0].Stock_disponible);
            } else {
                callback(null, null); // No se encontró el producto
            }
        });
    }

    static agregarProducto(producto, callback) {
        const { nombre, descripcion, precio, cantidadDisponible, categoria } = producto;
        // Primero, inserta el producto en Catalogo_de_Productos
        pool.query(
            'INSERT INTO Catalogo_de_Productos (Nombre, Descripcion, Precio, Cantidad_Disponible, Categoria) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, cantidadDisponible, categoria],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    const productoId = results.insertId;
                    // Luego, inserta el producto en Productos_Inventario
                    pool.query(
                        'INSERT INTO Productos_Inventario (ID_de_producto, Nombre_del_producto, Descripcion, Precio, Categoria, Stock_disponible, Stock_minimo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [productoId, nombre, descripcion, precio, categoria, cantidadDisponible, 0],
                        (error) => {
                            if (error) {
                                callback(error, null);
                            } else {
                                // Finalmente, actualiza el ID_de_producto_en_inventario en Catalogo_de_Productos
                                pool.query(
                                    'UPDATE Catalogo_de_Productos SET ID_de_producto_en_inventario = ? WHERE ID = ?',
                                    [productoId, productoId],
                                    (error) => {
                                        if (error) {
                                            callback(error, null);
                                        } else {
                                            callback(null, productoId);
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    }

    static actualizarProducto(id, nuevoProducto, callback) { // Funciono correctamente
        const { nombre, descripcion, precio, cantidadDisponible, categoria } = nuevoProducto;

        // Primero, actualizamos en Catalogo_de_Productos
        pool.query(
            'UPDATE Catalogo_de_Productos SET Nombre = ?, Descripcion = ?, Precio = ?, Cantidad_Disponible = ?, Categoria = ? WHERE ID = ?',
            [nombre, descripcion, precio, cantidadDisponible, categoria, id],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else if (results.affectedRows === 0) {
                    // Si no se encontró el producto en Catalogo_de_Productos
                    callback(new Error(`Producto con ID ${id} no encontrado en Catalogo_de_Productos.`), null);
                } else {
                    // Luego, obtenemos el ID_de_producto_en_inventario de Catalogo_de_Productos para actualizar en Productos_Inventario
                    pool.query(
                        'SELECT ID_de_producto_en_inventario FROM Catalogo_de_Productos WHERE ID = ?',
                        [id],
                        (error, results) => {
                            if (error || results.length === 0) {
                                callback(error || new Error("Producto no encontrado en Catalogo_de_Productos"), null);
                            } else {
                                const idProductoInventario = results[0].ID_de_producto_en_inventario;

                                // Verificamos si el producto tiene un ID_de_producto_en_inventario válido
                                if (idProductoInventario === null) {
                                    callback(null, `Producto con ID ${id} actualizado en Catalogo_de_Productos, pero no tiene entrada en Productos_Inventario.`);
                                } else {
                                    // Actualizamos en Productos_Inventario usando el ID obtenido
                                    pool.query(
                                        'UPDATE Productos_Inventario SET Nombre_del_producto = ?, Descripcion = ?, Precio = ?, Categoria = ? WHERE ID_de_producto = ?',
                                        [nombre, descripcion, precio, categoria, idProductoInventario],
                                        (error) => {
                                            if (error) {
                                                callback(error, null);
                                            } else {
                                                callback(null, `Producto con ID ${id} actualizado en ambas tablas.`);
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    );
                }
            }
        );
    }

    static eliminarProducto(id, callback) {     // Funciono correctamente
        // Primero elimina el producto de Catalogo_de_Productos
        pool.query('DELETE FROM Catalogo_de_Productos WHERE ID = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.affectedRows === 0) {
                // Si no se encontró el producto en Catalogo_de_Productos
                callback(null, `No se encontró el producto con ID ${id} en Catalogo_de_Productos.`);
            } else {
                // Después intenta eliminar de Productos_Inventario
                pool.query('DELETE FROM Productos_Inventario WHERE ID_de_producto = ?', [id], (error, results) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        callback(null, `Producto con ID ${id} eliminado con éxito de ambas tablas.`);
                    }
                });
            }
        });
    }
}

module.exports = CatalogoProductos;



