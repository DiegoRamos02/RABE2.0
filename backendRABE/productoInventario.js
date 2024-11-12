// Producto/Inventario, Controlador de la tabla

const pool = require('../db_conection/db'); 

class Producto {
  constructor(id, nombre, descripcion, precio, categoria, stockDisponible, stockMinimo) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
    this.stockDisponible = stockDisponible;
    this.stockMinimo = stockMinimo;
  }
   
  // Método para obtener todos los productos en inventario
  static obtenerTodos(callback) {                           // Funciona correctamente
    pool.query('SELECT * FROM Productos_Inventario', (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  // Método para buscar productos por categoría
  static obtenerCategoria(categoria, callback) {    // Funciona correctamente
    pool.query(
      'SELECT * FROM Productos_Inventario WHERE Categoria LIKE ?',
      [`%${categoria}%`],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      }
    );
  }

  // Método para obtener un producto por ID
  static obtenerPorID(id, callback) {        // Funcona correctamente
    pool.query('SELECT * FROM Productos_Inventario WHERE ID_de_producto = ?', [id], (error, results) => {
      if (error) {
        callback(error, null);
      } else if (results.length === 0) {
        callback(new Error(`Producto con ID ${id} no encontrado.`), null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  // Método para agregar un nuevo producto
  static agregarProducto(producto, callback) {    // Funciono correctamente
    const { nombre, descripcion, precio, categoria, stockDisponible, stockMinimo } = producto;

    // Insertar el producto en Productos_Inventario
    pool.query(
      'INSERT INTO Productos_Inventario (Nombre_del_producto, Descripcion, Precio, Categoria, Stock_disponible, Stock_minimo) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, categoria, stockDisponible, stockMinimo],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          const productoId = results.insertId; // Obtener el ID generado automáticamente

          // Insertar el producto en Catalogo_de_Productos con el ID generado
          pool.query(
            'INSERT INTO Catalogo_de_Productos (ID, Nombre, Descripcion, Precio, Cantidad_Disponible, Categoria, ID_de_producto_en_inventario) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [productoId, nombre, descripcion, precio, stockDisponible, categoria, productoId], // ID_de_producto_en_inventario es el mismo que el ID de producto
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

  // Método para actualizar un producto en Productos_Inventario y Catalogo_de_Productos
  static actualizarProducto(id, nuevoProducto, callback) {
    const { nombre, descripcion, precio, categoria, stockDisponible, stockMinimo } = nuevoProducto;

    // Primero, actualizamos el producto en Productos_Inventario
    pool.query(
      'UPDATE Productos_Inventario SET Nombre_del_producto = ?, Descripcion = ?, Precio = ?, Categoria = ?, Stock_disponible = ?, Stock_minimo = ? WHERE ID_de_producto = ?',
      [nombre, descripcion, precio, categoria, stockDisponible, stockMinimo, id],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else if (results.affectedRows > 0) {
          // Si se actualizó en Productos_Inventario, también actualizamos en Catalogo_de_Productos
          pool.query(
            'UPDATE Catalogo_de_Productos SET Nombre = ?, Descripcion = ?, Precio = ?, Cantidad_Disponible = ?, Categoria = ? WHERE ID_de_producto_en_inventario = ?',
            [nombre, descripcion, precio, stockDisponible, categoria, id],
            (error, results) => {
              if (error) {
                callback(error, null);
              } else if (results.affectedRows > 0) {
                callback(null, `Producto con ID ${id} actualizado en ambas tablas.`);
              } else {
                callback(new Error('No se encontró el producto en Catalogo_de_Productos para actualizar'), null);
              }
            }
          );
        } else {
          callback(new Error('No se encontró ningún producto con el ID proporcionado en Productos_Inventario'), null);
        }
      }
    );
  }

  // Método para eliminar un producto por ID en ambas tablas
  static eliminarProducto(id, callback) {                     // Funciona correctamente
    // Primero, elimina el producto de Catalogo_de_Productos
    pool.query('DELETE FROM Catalogo_de_Productos WHERE ID_de_producto_en_inventario = ?', [id], (error, results) => {
      if (error) {
        callback(new Error(`Error al eliminar el producto en Catalogo_de_Productos: ${error.message}`), null);
      } else {
        // Luego, elimina el producto de Productos_Inventario
        pool.query('DELETE FROM Productos_Inventario WHERE ID_de_producto = ?', [id], (error, results) => {
          if (error) {
            callback(new Error(`Error al eliminar el producto en Productos_Inventario: ${error.message}`), null);
          } else {
            callback(null, `Producto con ID ${id} eliminado con éxito de ambas tablas.`);
          }
        });
      }
    });
  }

  // Método para eliminar todos los productos de una categoría en ambas tablas
  static eliminarProductosPorCategoria(categoria, callback) {                   // Funciona correctamente
    // Primero, elimina los productos en Catalogo_de_Productos con la categoría dada
    pool.query('DELETE FROM Catalogo_de_Productos WHERE Categoria = ?', [categoria], (error, results) => {
      if (error) {
        callback(new Error(`Error al eliminar los productos en Catalogo_de_Productos: ${error.message}`), null);
      } else {
        // Luego, elimina los productos en Productos_Inventario con la misma categoría
        pool.query('DELETE FROM Productos_Inventario WHERE Categoria = ?', [categoria], (error, results) => {
          if (error) {
            callback(new Error(`Error al eliminar los productos en Productos_Inventario: ${error.message}`), null);
          } else {
            callback(null, `Todos los productos de la categoría "${categoria}" han sido eliminados con éxito de ambas tablas.`);
          }
        });
      }
    });
  }

  // Método para verificar el stock de un producto
  static verificarStock(id, callback) {             // Funciona correctamente
    pool.query(
      'SELECT Stock_disponible FROM Productos_Inventario WHERE ID_de_producto = ?',
      [id],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else if (results.length > 0) {
          const stockDisponible = results[0].Stock_disponible;
          callback(null, stockDisponible);
        } else {
          callback(new Error('El producto no se encontró en la base de datos'), null);
        }
      }
    );
  }
}

module.exports = Producto;

