// Pruebas de los controladores de la base de datos
// Importando los controladores de la base de datos
const CatalogoProductos = require('./catalogoProductos');

// <------------------ catalagoProductos.js Pruebas ------------------->
/*
// Prueba para obtener todos los productos
function pruebaObtenerTodos() {
  CatalogoProductos.obtenerTodos((error, productos) => {
    if (error) {
      console.error("Error al obtener todos los productos:", error);
    } else {
      console.log("Productos obtenidos:", productos);
    }
  });
}
pruebaObtenerTodos(); 

// Funcion para buscar productos por  categoria y ordenarlos en precio
function pruebaBuscarPorCategoria(categoria) {
  CatalogoProductos.buscarPorCategoria(categoria, (error, productos) => {
    if (error) {
      console.error(`Error al buscar productos en la categoría "${categoria}":`, error);
    } else {
      console.log(`Productos encontrados en la categoría "${categoria}":`, productos);
      // Ahora llama a ordenar con la categoría especificada
      pruebaOrdenarProductos('precio', categoria);
    }
  });
}

function pruebaOrdenarProductos(criterio, categoria) {
  CatalogoProductos.ordenarProductos(criterio, categoria, (error, productos) => {
    if (error) {
      console.error(`Error al ordenar productos por "${criterio}" en la categoría "${categoria}":`, error);
    } else {
      console.log(`Productos ordenados por "${criterio}" en la categoría "${categoria}":`, productos);
    }
  });
}
pruebaBuscarPorCategoria('celulares');

// Función para conocer la cantidad disponible de un producto
function pruebaObtenerCantidadDisponible(idProducto) {
  CatalogoProductos.obtenerCantidadDisponible(idProducto, (error, cantidadDisponible) => {
    if (error) {
      console.error(`Error al obtener la cantidad disponible del producto con ID ${idProducto}:`, error);
    } else if (cantidadDisponible !== null) {
      console.log(`Cantidad disponible del producto con ID ${idProducto}:`, cantidadDisponible);
    } else {
      console.log(`El producto con ID ${idProducto} no tiene cantidad disponible registrada.`);
    }

    // Llama a pruebaBuscarPorCategoria después de verificar la disponibilidad
    pruebaBuscarPorCategoria('electronicos');
  });
}

// Función para buscar productos por categoría
function pruebaBuscarPorCategoria(categoria) {
  CatalogoProductos.buscarPorCategoria(categoria, (error, productos) => {
    if (error) {
      console.error(`Error al buscar productos en la categoría "${categoria}":`, error);
    } else {
      console.log(`Productos encontrados en la categoría "${categoria}":`, productos);
    }
  });
}

// Llamada inicial para obtener la cantidad disponible y luego buscar por categoría
pruebaObtenerCantidadDisponible(1); // Cambia el ID según el producto que quieras verificar

// Funcion para eliminar productos por ID
function pruebaEliminarProducto(idProducto) {
  CatalogoProductos.eliminarProducto(idProducto, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el producto con ID ${idProducto}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}

// Llama a la función de prueba con el ID del producto que deseas eliminar
pruebaEliminarProducto(8); // Cambia el ID según el producto que quieras probar

// Función para actualizar el producto
function pruebaActualizarProducto(idProducto) {
  const nuevoProductoActualizado = {
    nombre: 'IMAC',
    descripcion: 'Pro',
    precio: 2000.30,
    cantidadDisponible: 120,
    categoria: 'Electronicos'
  };

  CatalogoProductos.actualizarProducto(idProducto, nuevoProductoActualizado, (error, mensaje) => {
    if (error) {
      console.error(`Error al actualizar el producto con ID ${idProducto}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}

// Llama a la función de prueba con el ID del producto que deseas actualizar
pruebaActualizarProducto(5); 

// Define un nuevo producto para agregar
const nuevoProducto = {
  nombre: 'Pincel',
  descripcion: '6 pulgadas',
  precio: 150.50,
  cantidadDisponible: 800,
  categoria: 'Arte'
};

// Prueba para agregar un producto
CatalogoProductos.agregarProducto(nuevoProducto, (error, productoId) => {
  if (error) {
    console.error("Error al agregar el producto:", error);
  } else {
    console.log("Producto agregado con ID:", productoId);

    // 2. Prueba para obtener el producto recién agregado por ID
    pruebaObtenerProducto(productoId);
  }
});

// Función para obtener un producto por ID
function pruebaObtenerProducto(idProducto) {
  CatalogoProductos.obtenerPorId(idProducto, (error, producto) => {
    if (error) {
      console.error(`Error al obtener el producto con ID ${idProducto}:`, error);
    } else {
      console.log(`Producto con ID ${idProducto} obtenido:`, producto);
    }
  });
}
*/
 