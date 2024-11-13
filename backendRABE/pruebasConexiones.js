// Pruebas de los controladores de la base de datos
// Importando los controladores de la base de datos
const CatalogoProductos = require('./catalogoProductos');
const Producto = require('./productoInventario');
const Usuario = require('./usuarios');
const Empleado = require('./empleados');

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
// <----------- Controlador para productoInventario ----------->
/*
// Función para probar el controlador obtenerTodos
function pruebaObtenerTodos() {
  Producto.obtenerTodos((error, productos) => {
    if (error) {
      console.error("Error al obtener los productos del inventario:", error);
    } else {
      console.log("Productos en inventario:", productos);
    }
  });
}
// Llama la funcion
pruebaObtenerTodos();

// Funcion para pobrar la busqueda por categoria
function pruebaObtenerCategoria(categoria) {
  Producto.obtenerCategoria(categoria, (error, productos) => {
    if (error) {
      console.error(`Error al obtener productos en la categoría "${categoria}":`, error);
    } else {
      console.log(`Productos en la categoría "${categoria}":`, productos);
    }
  });
}
// Llama a la función 
pruebaObtenerCategoria('Electrónicos'); // Cambia 'Electrónicos' por la categoría que deseas probar

// Funcion para buscar por ID
function pruebaObtenerPorID(id) {
  Producto.obtenerPorID(id, (error, producto) => {
    if (error) {
      console.error(`Error al obtener el producto por el ID "${id}":`, error);
    } else {
      console.log(`Producto con el ID "${id}":`, producto);
    }
  });
}
// Llama a la función
pruebaObtenerPorID(9); 

// Funcion para agregar
function pruebaAgregarProducto() {
  const nuevoProducto = {
    nombre: 'Tablet',
    descripcion: 'Tablet de última generación',
    precio: 500.00,
    categoria: 'Electrónicos',
    stockDisponible: 30,
    stockMinimo: 5
  };

  Producto.agregarProducto(nuevoProducto, (error, productoId) => {
    if (error) {
      console.error("Error al agregar el producto:", error);
    } else {
      console.log(`Producto agregado con ID ${productoId}`);
    }
  });
}
// Llama a la función de prueba
pruebaAgregarProducto();

// Funcion para actualizar
function pruebaActualizarProducto(idProducto) {
  const productoActualizado = {
    nombre: 'Tablet Actualizada',
    descripcion: 'Tablet con nuevas características',
    precio: 550.00,
    categoria: 'Electrónicos',
    stockDisponible: 25,
    stockMinimo: 5
  };

  Producto.actualizarProducto(idProducto, productoActualizado, (error, mensaje) => {
    if (error) {
      console.error(`Error al actualizar el producto con ID ${idProducto}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaActualizarProducto(9); // Cambia el ID según el producto que quieras actualizar

// Funcion para eliminar por ID
function pruebaEliminarProducto(idProducto) {
  Producto.eliminarProducto(idProducto, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el producto con ID ${idProducto}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarProducto(9); 

// Funcion para eliminar todos los productos por categoria
function pruebaEliminarProductosPorCategoria(categoria) {
  Producto.eliminarProductosPorCategoria(categoria, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar los productos de la categoría "${categoria}":`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarProductosPorCategoria('celulares'); // Cambia 'Electrónicos' por la categoría que deseas probar

// Funcion para verificar stock
function pruebaVerificarStock(idProducto) {
  Producto.verificarStock(idProducto, (error, stockDisponible) => {
    if (error) {
      console.error(`Error al verificar el stock del producto con ID ${idProducto}:`, error);
    } else {
      console.log(`Stock disponible del producto con ID ${idProducto}: ${stockDisponible}`);
    }
  });
}

// Llama a la función de prueba
pruebaVerificarStock(10); // Cambia el ID según el producto que deseas verificar

// <----------------- Controladores para usuarios -------------->

// Funcion para obtener los usuarios
function pruebaObtenerTodosUsuarios() {
  Usuario.obtenerTodos((error, usuarios) => {
    if (error) {
      console.error("Error al obtener todos los usuarios:", error);
    } else {
      console.log("Usuarios:", usuarios);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTodosUsuarios();

// Funcion para obtener usuario por ID
function pruebaObtenerIDUsuario(id) {
  Usuario.obtenerIDUsuario(id, (error, usuario) => {
    if (error) {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
    } else {
      console.log(`Usuario con ID ${id}:`, usuario);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerIDUsuario(1); 

// Funcion para agregar un nuevo usuario 
function pruebaAgregarUsuario() {
  const nuevoUsuario = {
    nombreUsuario: 'usuario_test',
    contraseña: 'password123',
    rol: 'admin'
  };

  Usuario.agregarUsuario(nuevoUsuario, (error, usuario) => {
    if (error) {
      console.error("Error al agregar el usuario:", error);
    } else {
      console.log("Usuario agregado:", usuario);
    }
  });
}
// Llama a la función de prueba
pruebaAgregarUsuario();

// Actualizar usuarios
function pruebaActualizarUsuario(idUsuario) {
  const usuarioActualizado = {
    nombreUsuario: 'usuario_actualizado',
    contraseña: 'nueva_password123',
    rol: 'admin'
  };

  Usuario.actualizarUsuario(idUsuario, usuarioActualizado, (error, usuario) => {
    if (error) {
      console.error(`Error al actualizar el usuario con ID ${idUsuario}:`, error);
    } else {
      console.log(`Usuario actualizado:`, usuario);
    }
  });
}
// Llama a la función de prueba
pruebaActualizarUsuario(3); 

// Funcion para eliminar usuarios
function pruebaEliminarUsuario(idUsuario) {
  Usuario.eliminarUsuario(idUsuario, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el usuario con ID ${idUsuario}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarUsuario(3);

// Funcion para buscar usuarios por nombre
function pruebaObtenerPorNombreUsuario(nombreUsuario) {
  Usuario.obtenerPorNombreUsuario(nombreUsuario, (error, usuario) => {
    if (error) {
      console.error(`Error al obtener el usuario con nombre "${nombreUsuario}":`, error);
    } else {
      console.log(`Usuario con nombre "${nombreUsuario}":`, usuario);
    }
  });
}

// Llama a la función de prueba
pruebaObtenerPorNombreUsuario('admin1');

// <----------- Controladores para los empleados --------------->

// Funcion para obtener todos los emleados
function pruebaObtenerTodosEmpleados() {
  Empleado.obtenerTodos((error, empleados) => {
    if (error) {
      console.error("Error al obtener todos los empleados:", error);
    } else {
      console.log("Empleados:", empleados);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTodosEmpleados();

// Funcion para obtener empleado por ID
function pruebaObtenerEmpleadoPorId(idEmpleado) {
  Empleado.obtenerPorId(idEmpleado, (error, empleado) => {
    if (error) {
      console.error(`Error al obtener el empleado con ID ${idEmpleado}:`, error);
    } else {
      console.log(`Empleado con ID ${idEmpleado}:`, empleado);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerEmpleadoPorId(1);

// Funcion para agregar nuevo empleado
function pruebaAgregarEmpleado() {
  const nuevoEmpleado = {
    nombre: 'Carlos',
    apellido: 'López',
    correo_electronico: 'carlos.lopez@example.com',
    contraseña: 'securepassword',
    puesto: 'Supervisor',
    rol: 'UsuarioRegular',
    acceso_configuracion: false
  };

  Empleado.agregarEmpleado(nuevoEmpleado, (error, empleadoId) => {
    if (error) {
      console.error("Error al agregar el empleado:", error);
    } else {
      console.log("Empleado agregado con ID:", empleadoId);
    }
  });
}
// Llama a la función de prueba
pruebaAgregarEmpleado();

// Funcion para actualizar empleado
function pruebaActualizarEmpleado(idEmpleado) {
  const empleadoActualizado = {
    nombre: 'Carlos',
    apellido: 'García',
    correo_electronico: 'carlos.garcia@example.com',
    contraseña: 'newsecurepassword',
    puesto: 'Gerente',
    rol: 'Administrador',
    acceso_configuracion: true
  };

  Empleado.actualizarEmpleado(idEmpleado, empleadoActualizado, (error, empleado) => {
    if (error) {
      console.error(`Error al actualizar el empleado con ID ${idEmpleado}:`, error);
    } else {
      console.log("Empleado actualizado:", empleado);
    }
  });
}
// Llama a la función de prueba
pruebaActualizarEmpleado(1);

// Funcion para eliminar empleado por ID
function pruebaEliminarEmpleado(idEmpleado) {
  Empleado.eliminarEmpleado(idEmpleado, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el empleado con ID ${idEmpleado}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarEmpleado(2);

// Funcion para obtener pedidos por empleado
function pruebaObtenerPedidosPorEmpleado(idEmpleado) {
  Empleado.obtenerPedidosPorEmpleado(idEmpleado, (error, pedidos) => {
    if (error) {
      console.error(`Error al obtener los pedidos/ventas del empleado con ID ${idEmpleado}:`, error);
    } else {
      console.log(`Pedidos/ventas del empleado con ID ${idEmpleado}:`, pedidos);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerPedidosPorEmpleado(1);
*/
// Funcion para obtener empleados por puesto
function pruebaObtenerEmpleadosPorPuesto(puesto) {
  Empleado.obtenerPorPuesto(puesto, (error, empleados) => {
    if (error) {
      console.error(`Error al obtener los empleados por puesto "${puesto}":`, error);
    } else {
      console.log(`Empleados con el puesto "${puesto}":`, empleados);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerEmpleadosPorPuesto('Gerente');