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

    static obtenerTodos(callback) {
        const query = `
        SELECT cp.*, pi."Stock disponible"
        FROM "Catálogo de Productos" cp
        INNER JOIN "Productos/Inventario" pi ON cp."ID de producto en inventario" = pi."ID de producto"
    `;
        pool.query(query, (error, results) => {
            if (error) {
                console.error("Error al obtener todos los productos:", error);
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }


    static obtenerPorId(id, callback) {
        const query = `
        SELECT cp.*, pi."Stock disponible"
        FROM "Catálogo de Productos" cp
        INNER JOIN "Productos/Inventario" pi ON cp."ID de producto en inventario" = pi."ID de producto"
        WHERE cp."ID" = $1
    `;
        pool.query(query, [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    static buscarPorCategoria(categoria, callback) {
        const query = `
            SELECT cp.*, pi."Stock disponible"
            FROM "Catálogo de Productos" cp
            INNER JOIN "Productos/Inventario" pi ON cp."ID de producto en inventario" = pi."ID de producto"
            WHERE cp."Categoría" = $1
        `;
        pool.query(query, [categoria], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    static ordenarProductos(criterio, callback) {
        let orderByClause = '';
        switch (criterio) {
            case 'nombre':
                orderByClause = 'cp."Nombre"';
                break;
            case 'precio':
                orderByClause = 'cp."Precio"';
                break;
            case 'categoria':
                orderByClause = 'cp."Categoría"';
                break;
            default:
                orderByClause = 'cp."Nombre"'; // Ordenar por nombre por defecto
        }

        const query = `
            SELECT cp.*, pi."Stock disponible"
            FROM "Catálogo de Productos" cp
            INNER JOIN "Productos/Inventario" pi ON cp."ID de producto en inventario" = pi."ID de producto"
            ORDER BY ${orderByClause}
        `;

        pool.query(query, (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    static obtenerCantidadDisponible(id, callback) {
        const query = `
            SELECT pi."Stock disponible"
            FROM "Catálogo de Productos" cp
            INNER JOIN "Productos/Inventario" pi ON cp."ID de producto en inventario" = pi."ID de producto"
            WHERE cp."ID" = $1
        `;
        pool.query(query, [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]['Stock disponible']);
            }
        });
    }

    static agregarProducto(producto, callback) {
        const { nombre, descripcion, precio, cantidadDisponible, categoria } = producto;
        // Insertar el producto en el catálogo
        pool.query(
            'INSERT INTO "Catálogo de Productos" ("Nombre", "Descripción", "Precio", "Cantidad Disponible", "Categoría") VALUES ($1, $2, $3, $4, $5) RETURNING "ID"',
            [nombre, descripcion, precio, cantidadDisponible, categoria],
            (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    const productoId = results.rows[0].ID;
                    // Insertar el producto en el inventario con el ID generado automáticamente
                    pool.query(
                        'INSERT INTO "Productos/Inventario" ("ID de producto", "Nombre del producto", "Descripción", "Precio", "Categoría", "Stock disponible", "Stock mínimo") VALUES ($1, $2, $3, $4, $5, $6, $7)',
                        [productoId, nombre, descripcion, precio, categoria, cantidadDisponible, 0], // Stock mínimo inicial 0
                        (error, _) => {
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





    static actualizarProducto(id, nuevoProducto, callback) {
        const { nombre, descripcion, precio, cantidadDisponible, categoria } = nuevoProducto;
        // Actualizar el producto en el catálogo
        pool.query(
            'UPDATE "Catálogo de Productos" SET "Nombre" = $1, "Descripción" = $2, "Precio" = $3, "Cantidad Disponible" = $4, "Categoría" = $5 WHERE "ID" = $6',
            [nombre, descripcion, precio, cantidadDisponible, categoria, id],
            (error) => {
                if (error) {
                    callback(error, null);
                } else {
                    // Actualizar el producto en el inventario si el nombre o la categoría han cambiado
                    pool.query(
                        'UPDATE "Productos/Inventario" SET "Nombre del producto" = $1, "Descripción" = $2, "Precio" = $3, "Categoría" = $4 WHERE "ID de producto" = $5',
                        [nombre, descripcion, precio, categoria, id],
                        (error) => {
                            if (error) {
                                callback(error, null);
                            } else {
                                callback(null, id);
                            }
                        }
                    );
                }
            }
        );
    }


    static eliminarProducto(id, callback) {
        // Eliminar el producto del catálogo
        pool.query('DELETE FROM "Catálogo de Productos" WHERE "ID" = $1', [id], (error) => {
            if (error) {
                callback(error, null);
            } else {
                // Eliminar el producto del inventario
                pool.query('DELETE FROM "Productos/Inventario" WHERE "ID de producto" = $1', [id], (error) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        callback(null, `Producto con ID ${id} eliminado con éxito.`);
                    }
                });
            }
        });
    }


}

module.exports = CatalogoProductos;


