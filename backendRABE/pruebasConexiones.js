// Pruebas de los controladores de la base de datos
// Importando los controladores de la base de datos
const CatalogoProductos = require('./catalogoProductos');
const Producto = require('./productoInventario');
const Usuario = require('./usuarios');
const Empleado = require('./empleados');
const PedidoVenta = require('./pedidoVenta');
const Cliente = require('./clientes');
const Ticket = require('./tickets');
const MetodoPago = require('./metodosPago');

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

// <------------- Controlador de pedidoVenta.js ------------>

// Funcion para obtener todos los pedidos
function pruebaObtenerTodosPedidos() {
  PedidoVenta.obtenerTodos((error, pedidos) => {
    if (error) {
      console.error("Error al obtener todos los pedidos/ventas:", error);
    } else {
      console.log("Pedidos/ventas:", pedidos);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTodosPedidos();

// Funcion para obtener pedidos por ID
function pruebaObtenerPedidoPorId(idPedido) {
  PedidoVenta.obtenerPorId(idPedido, (error, pedido) => {
    if (error) {
      console.error(`Error al obtener el pedido/venta con ID ${idPedido}:`, error);
    } else {
      console.log(`Pedido/venta con ID ${idPedido}:`, pedido);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerPedidoPorId(7);

// Funcion para agregar pedidos
function pruebaAgregarPedidoVenta() {
  const nuevoPedido = {
    id_cliente: 1,
    fecha_hora: new Date(),
    tipo: 'Consumo en el lugar',
    estado: 'Pendiente',
    total: 150.00,
    metodo_pago: 1,
    id_empleado: 1
  };

  PedidoVenta.agregarPedidoVenta(nuevoPedido, (error, pedidoId) => {
    if (error) {
      console.error("Error al agregar el pedido/venta:", error);
    } else {
      console.log("Pedido/venta agregado con ID:", pedidoId);
    }
  });
}
// Llama a la función de prueba
pruebaAgregarPedidoVenta();

// Funcion para actualizar pedidos
function pruebaActualizarPedidoVenta(idPedido) {
  const pedidoActualizado = {
    id_cliente: 1,
    fecha_hora: new Date(),
    tipo: 'Consumo en el lugar',
    estado: 'Entregado',
    total: 200.00,
    metodo_pago: 1,
    id_empleado: 1
  };

  PedidoVenta.actualizarPedidoVenta(idPedido, pedidoActualizado, (error, pedido) => {
    if (error) {
      console.error(`Error al actualizar el pedido/venta con ID ${idPedido}:`, error);
    } else {
      console.log("Pedido/venta actualizado:", pedido);
    }
  });
}
// Llama a la función de prueba
pruebaActualizarPedidoVenta(10);

// Funcion para eliminar pedido por ID
function pruebaEliminarPedidoVenta(idPedido) {
  PedidoVenta.eliminarPedidoVenta(idPedido, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el pedido/venta con ID ${idPedido}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarPedidoVenta(10);

// Funcion para obtener pedidos por empleado
function pruebaObtenerPedidosPorEmpleado(idEmpleado) {
  PedidoVenta.obtenerPedidosPorEmpleado(idEmpleado, (error, pedidos) => {
    if (error) {
      console.error(`Error al obtener los pedidos/ventas del empleado con ID ${idEmpleado}:`, error);
    } else {
      console.log(`Pedidos/ventas del empleado con ID ${idEmpleado}:`, pedidos);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerPedidosPorEmpleado(1);

// Funcion para obtener pedidos por clientes
function pruebaObtenerPedidosPorCliente(idCliente) {
  PedidoVenta.obtenerPedidosPorCliente(idCliente, (error, pedidos) => {
    if (error) {
      console.error(`Error al obtener los pedidos/ventas del cliente con ID ${idCliente}:`, error);
    } else {
      console.log(`Pedidos/ventas del cliente con ID ${idCliente}:`, pedidos);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerPedidosPorCliente(1);

// <------------ Controlador para clientes.js -------------->

// Funcion para obtener todos los clientes
function pruebaObtenerTodosClientes() {
  Cliente.obtenerTodos((error, clientes) => {
    if (error) {
      console.error("Error al obtener todos los clientes:", error);
    } else {
      console.log("Clientes:", clientes);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTodosClientes();

// Funcion para obtener clientes por ID
function pruebaObtenerClientePorId(idCliente) {
  Cliente.obtenerPorId(idCliente, (error, cliente) => {
    if (error) {
      console.error(`Error al obtener el cliente con ID ${idCliente}:`, error);
    } else {
      console.log(`Cliente con ID ${idCliente}:`, cliente);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerClientePorId(1);

// Funcion para agregar clientes
function pruebaAgregarCliente() {
  const nuevoCliente = {
    nombre: 'Diego',
    apellido: 'Ramos',
    correo: 'diego.ramos@example.com',
    telefono: '1234567890',
    direccion: 'Calle Falsa 123'
  };

  Cliente.agregarCliente(nuevoCliente, (error, cliente) => {
    if (error) {
      console.error("Error al agregar el cliente:", error);
    } else {
      console.log("Cliente agregado:", cliente);
    }
  });
}
// Llama a la función de prueba
pruebaAgregarCliente();

// Funcion para actualizar clientes
function pruebaActualizarCliente(idCliente) {
  const clienteActualizado = {
    nombre: 'Carlos',
    apellido: 'Garcia',
    correo: 'carlos.garcia@example.com',
    telefono: '0987654321',
    direccion: 'Avenida Siempre Viva 742'
  };

  Cliente.actualizarCliente(idCliente, clienteActualizado, (error, cliente) => {
    if (error) {
      console.error(`Error al actualizar el cliente con ID ${idCliente}:`, error);
    } else {
      console.log("Cliente actualizado:", cliente);
    }
  });
}
// Llama a la función de prueba
pruebaActualizarCliente(4);

// Funcion para eliminar clientes por ID
function pruebaEliminarCliente(idCliente) {
  Cliente.eliminarCliente(idCliente, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el cliente con ID ${idCliente}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarCliente(1);

// <---------- Controlador para tickets.js ----------->
// Funcion para agregar ticket
function pruebaAgregarTicket() {
  const nuevoTicket = {
    id_pedido_venta: 8,  // Cambia el ID según el pedido/venta que deseas asociar
    fecha_hora_emision: new Date(),
    detalles: 'Detalles adicionales sobre la venta'
  };

  Ticket.agregarTicket(nuevoTicket, (error, ticketId) => {
    if (error) {
      console.error("Error al agregar el ticket:", error);
    } else {
      console.log("Ticket agregado con ID:", ticketId);
    }
  });
}
// Llama a la función de prueba
pruebaAgregarTicket();

// Funcion para obtener todos los tickets
function pruebaObtenerTodosTickets() {
  Ticket.obtenerTodos((error, tickets) => {
    if (error) {
      console.error("Error al obtener todos los tickets:", error);
    } else {
      console.log("Tickets:", tickets);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTodosTickets();

// Funcion para obtener ticket por ID
function pruebaObtenerTicketPorId(idTicket) {
  Ticket.obtenerPorId(idTicket, (error, ticket) => {
    if (error) {
      console.error(`Error al obtener el ticket con ID ${idTicket}:`, error);
    } else {
      console.log(`Ticket con ID ${idTicket}:`, ticket);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTicketPorId(1);

// Funcion para actualizar el ticket
function pruebaActualizarTicket(idTicket) {
  const ticketActualizado = {
    id_pedido_venta: 8, // Cambia según corresponda
    fecha_hora_emision: new Date(),
    total: 150.00,
    detalles: 'Detalles actualizados sobre la venta'
  };

  Ticket.actualizarTicket(idTicket, ticketActualizado, (error, ticket) => {
    if (error) {
      console.error(`Error al actualizar el ticket con ID ${idTicket}:`, error);
    } else {
      console.log("Ticket actualizado:", ticket);
    }
  });
}
// Llama a la función de prueba
pruebaActualizarTicket(1);

// Funcion para obetener ticket por pedido
function pruebaObtenerTicketsPorPedidoVenta(idPedidoVenta) {
  Ticket.obtenerTicketsPorPedidoVenta(idPedidoVenta, (error, tickets) => {
    if (error) {
      console.error(`Error al obtener los tickets del pedido/venta con ID ${idPedidoVenta}:`, error);
    } else {
      console.log(`Tickets del pedido/venta con ID ${idPedidoVenta}:`, tickets);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTicketsPorPedidoVenta(8);

// Funcion para eliminar ticket por ID
function pruebaEliminarTicket(idTicket) {
  Ticket.eliminarTicket(idTicket, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el ticket con ID ${idTicket}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarTicket(1);

// <---------- Controlador para metodos de pago ----------->
// Funcion para obetener todos los metodos de pago
function pruebaObtenerTodosMetodosPago() {
  MetodoPago.obtenerTodos((error, metodosPago) => {
    if (error) {
      console.error("Error al obtener todos los métodos de pago:", error);
    } else {
      console.log("Métodos de Pago:", metodosPago);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerTodosMetodosPago();

// Funcion para obtener metodo de pago por ID
function pruebaObtenerMetodoPagoPorID(idMetodoPago) {
  MetodoPago.obtenerPorID(idMetodoPago, (error, metodoPago) => {
    if (error) {
      console.error(`Error al obtener el método de pago con ID ${idMetodoPago}:`, error);
    } else {
      console.log(`Método de Pago con ID ${idMetodoPago}:`, metodoPago);
    }
  });
}
// Llama a la función de prueba
pruebaObtenerMetodoPagoPorID(1);

// Funcion para agregar un nuevo metodo de pago
function pruebaAgregarMetodoPago() {
  const nuevoMetodo = {
    nombreMetodo: 'Vales de despensa',
    descripcion: 'Pago mediante tarjeta de crédito Visa o MasterCard',
    activo: true
  };

  MetodoPago.agregarMetodoPago(nuevoMetodo, (error, metodoPago) => {
    if (error) {
      console.error("Error al agregar el método de pago:", error);
    } else {
      console.log("Método de pago agregado:", metodoPago);
    }
  });
}
// Llama a la función de prueba
pruebaAgregarMetodoPago();

// Funcion para eliminar metodo de pago
function pruebaEliminarMetodoPago(idMetodoPago) {
  MetodoPago.eliminarMetodoPago(idMetodoPago, (error, mensaje) => {
    if (error) {
      console.error(`Error al eliminar el método de pago con ID ${idMetodoPago}:`, error);
    } else {
      console.log(mensaje);
    }
  });
}
// Llama a la función de prueba
pruebaEliminarMetodoPago(5);
*/