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
   
  // Método para obtener todos los productos
  static obtenerTodos(callback) {
    pool.query('SELECT * FROM "Productos/Inventario"', (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.rows);
      }
    });
  }

  // Metodo para buscar por categoria
  static obtenerCategoria(categoria, callback) {
    pool.query('SELECT * FROM "Productos/Inventario" WHERE "Categoría" LIKE $1', [`%${categoria}%`], (error, results) => {
      if (error) {
      callback(error, null);
      } else {
        callback(null, results.rows);
      }
    });
  }

  // Método para obtener un producto por su ID
  static obtenerPorId(id, callback) {
    pool.query('SELECT * FROM "Productos/Inventario" WHERE "ID de producto" = $1', [id], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.rows[0]);
      }
    });
  }


  // Método para agregar un nuevo producto
  static agregarProducto(producto, callback) {
    const { nombre, descripcion, precio, categoria, stockDisponible, stockMinimo } = producto;
    pool.query(
      'INSERT INTO "Productos/Inventario" ("Nombre del producto", "Descripción", "Precio", "Categoría", "Stock disponible", "Stock mínimo") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "ID de producto"',
      [nombre, descripcion, precio, categoria, stockDisponible, stockMinimo],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          const productoId = results.rows[0]["ID de producto"];
          // Insertar el producto en el catálogo con el ID generado automáticamente
          pool.query(
            'INSERT INTO "Catálogo de Productos" ("ID", "Nombre", "Descripción", "Precio", "Cantidad Disponible", "Categoría", "ID de producto en inventario") VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [productoId, nombre, descripcion, precio, stockDisponible, categoria, productoId], // ID de producto en inventario es el mismo que el ID de producto
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


 // Método para actualizar un producto
  static actualizarProducto(id, nuevoProducto, callback) {
    const { nombre, descripcion, precio, categoria, stockDisponible, stockMinimo } = nuevoProducto;
    pool.query(
      'UPDATE "Productos/Inventario" SET "Nombre del producto" = $1, "Descripción" = $2, "Precio" = $3, "Categoría" = $4, "Stock disponible" = $5, "Stock mínimo" = $6 WHERE "ID de producto" = $7 RETURNING *',
      [nombre, descripcion, precio, categoria, stockDisponible, stockMinimo, id],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else if (results.rows.length > 0) {
          callback(null, results.rows[0]);
        } else {
          callback(new Error('No se encontró ningún producto con el ID proporcionado'), null);
        }
      }
    );
  }

    // Metodo para eliminar un producto por ID
  static eliminarProducto(id, callback){
    pool.query('DELETE FROM "Productos/Inventario" WHERE "ID de producto" = $1', [id], (error, results) => {
      if(error){
        callback(new Error(`Error al eliminar el producto: ${error.message}`), null);
      }else{
        callback(null, `Producto con ID ${id} eliminado con éxito.`);
      }
    });
  }

  // Método para eliminar todos los productos de una categoría
  static eliminarProductosPorCategoria(categoria, callback) {
    pool.query('DELETE FROM "Productos/Inventario" WHERE "Categoría" = $1', [categoria], (error, results) => {
      if (error) {
        callback(new Error(`Error al eliminar los productos: ${error.message}`), null);
      } else {
        callback(null, `Todos los productos de la categoría ${categoria} han sido eliminados con éxito.`);
      }
    });
  }

  // Método para verificar el stock de un producto
  static verificarStock(id, callback){
    pool.query('SELECT "Stock disponible" FROM "Productos/Inventario" WHERE "ID de producto" = $1', [id], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        if (results.rows.length > 0) {
          const stockDisponible = results.rows[0]["Stock disponible"];
          callback(null, stockDisponible);
        } else {
          callback(new Error('El producto no se encontró en la base de datos'), null);
        }
      }
    });
  }
}

module.exports = Producto;

