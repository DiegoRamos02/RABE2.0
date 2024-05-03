// Importa los modelos de los controladores y la base de datos
const pool = require('../db_conection/db');
const Producto = require('../backendRABE/productoInventario');
const Cliente = require('../backendRABE/clientes');
const CatalogoProductos = require('../backendRABE/catalogoProductos');
const Usuario = require('../backendRABE/usuarios');
const MetodoPago = require('../backendRABE/metodosPago');
const Empleado = require('../backendRABE/empleados');
const PedidoVenta = require('../backendRABE/pedidoVenta');
const Ticket = require('../backendRABE/tickets');
const Factura = require('../backendRABE/facturas');


//PENE DE BURRO 

// A Ricardo le encanta el pene de burro 

/*

<------------------------- Codigos que corroboran el funcionamiento del controlador facturas.js---------------------->

// Eliminar facturas
const facturaId = 1; // Reemplaza con el ID de la factura que deseas eliminar
Factura.eliminarFactura(facturaId, (error, mensaje) => {
  if (error) {
    console.error('Error al eliminar la factura:', error);
  } else {
    console.log(mensaje);
  }
});

// Obtener facturas por empleado
const empleadoId = 2; // Reemplaza con el ID del empleado
Factura.obtenerFacturasPorEmpleado(empleadoId, (error, facturas) => {
  if (error) {
    console.error('Error al obtener las facturas del empleado:', error);
  } else {
    console.log('Facturas del empleado:', facturas);
  }
});

// Obtener factura por ID de venta/pedido
const pedidoVentaId = 1; // Reemplaza con el ID del pedido/venta asociado
Factura.obtenerFacturasPorPedidoVenta(pedidoVentaId, (error, facturas) => {
  if (error) {
    console.error('Error al obtener las facturas del pedido/venta:', error);
  } else {
    console.log('Facturas del pedido/venta:', facturas);
  }
});

// Actualizar factura
const facturaId = 1; // Reemplaza con el ID de la factura que deseas actualizar
const nuevaInformacionFactura = {
  id_cliente: 12, // Nuevo ID del cliente
  fecha_hora_emision: new Date(), // Nueva fecha y hora de emisión
  total: 150.75, // Nuevo total de la factura
  metodo_pago: 2, // Nuevo método de pago
  id_empleado: 2, // Nuevo ID del empleado
  id_pedido_venta: 1, // Nuevo ID del pedido/venta asociado
  numero_factura: 'F0002', // Nuevo número de factura
  detalles_adicionales: 'Nuevos detalles adicionales de la factura' // Nuevos detalles adicionales (opcional)
};
Factura.actualizarFactura(facturaId, nuevaInformacionFactura, (error, facturaActualizada) => {
  if (error) {
    console.error('Error al actualizar la factura:', error);
  } else {
    console.log('Factura actualizada:', facturaActualizada);
  }
});

// Obtener factura por su ID
const facturaId = 1; // Reemplaza con el ID de la factura que deseas obtener
Factura.obtenerPorId(facturaId, (error, factura) => {
  if (error) {
    console.error('Error al obtener la factura por ID:', error);
  } else {
    console.log('Factura obtenida:', factura);
  }
});

// Obtener las facturas
Factura.obtenerTodas((error, facturas) => {
  if (error) {
    console.error('Error al obtener todas las facturas:', error);
  } else {
    console.log('Todas las facturas:', facturas);
  }
});

// Agregar factura
const nuevaFactura = {
  id_cliente: 12, // Reemplaza con el ID del cliente asociado
  fecha_hora_emision: new Date(), // Fecha y hora de emisión de la factura
  total: 100.50, // Total de la factura
  metodo_pago: 2, // Método de pago
  id_empleado: 2, // Reemplaza con el ID del empleado asociado
  id_pedido_venta: 1, // Reemplaza con el ID del pedido/venta asociado
  numero_factura: 'F0001', // Número de factura
  detalles_adicionales: 'Detalles adicionales de la factura' // Detalles adicionales (opcional)
};
Factura.agregarFactura(nuevaFactura, (error, facturaId) => {
  if (error) {
    console.error('Error al agregar una nueva factura:', error);
  } else {
    console.log('ID de la nueva factura:', facturaId);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador tickets.js---------------------->

// Eliminar un ticket
const ticketId = 1; // ID del ticket que deseas eliminar
Ticket.eliminarTicket(ticketId, (error, mensaje) => {
  if (error) {
    console.error('Error al eliminar el ticket:', error);
  } else {
    console.log(mensaje);
  }
});

// Obtener todos los tickets
Ticket.obtenerTodos((error, tickets) => {
  if (error) {
    console.error('Error al obtener todos los tickets:', error);
  } else {
    console.log('Tickets:', tickets);
  }
});

// Obtener un ticket por su ID
const ticketId = 1; // ID del ticket que deseas obtener
Ticket.obtenerPorId(ticketId, (error, ticket) => {
  if (error) {
    console.error('Error al obtener el ticket por ID:', error);
  } else {
    console.log('Ticket obtenido:', ticket);
  }
});

// Actualizar un ticket
const ticketId = 1; // ID del ticket que deseas actualizar
const nuevoTicketData = {
  id_pedido_venta: 1,
  fecha_hora_emision: new Date(),
  total: 75.00,
  detalles: 'Compra de productos de electrónica'
};
Ticket.actualizarTicket(ticketId, nuevoTicketData, (error, ticketActualizado) => {
  if (error) {
    console.error('Error al actualizar el ticket:', error);
  } else {
    console.log('Ticket actualizado:', ticketActualizado);
  }
});

// Obtener ticket por medio del ID del pedido/venta
const pedidoVentaId = 1; // ID del pedido/venta del que deseas obtener los tickets
Ticket.obtenerTicketsPorPedidoVenta(pedidoVentaId, (error, tickets) => {
  if (error) {
    console.error('Error al obtener los tickets del pedido/venta:', error);
  } else {
    console.log('Tickets del pedido/venta:', tickets);
  }
});

// Agregar un nuevo ticket
const nuevoTicket = {
  id_pedido_venta: 1, // Reemplaza con el ID del pedido/venta al que deseas asociar el ticket
  fecha_hora_emision: new Date(), // Puedes establecer la fecha y hora actual o cualquier otra fecha deseada
  detalles: 'Compra de productos variados'
};
Ticket.agregarTicket(nuevoTicket, (error, ticketId) => {
  if (error) {
    console.error('Error al agregar un nuevo ticket:', error);
  } else {
    console.log('ID del nuevo ticket:', ticketId);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador pedidoVenta.js---------------------->

// Eliminar pedido/venta
const pedidoID = 1; // ID del pedido/venta que deseas eliminar
PedidoVenta.eliminarPedidoVenta(pedidoID, (error, mensaje) => {
  if (error) {
    console.error(`Error al eliminar pedido/venta con ID ${pedidoID}:`, error);
  } else {
    console.log('Mensaje de eliminación:', mensaje);
  }
});

// Obtener pedidos por ID del cliente
const clienteID = 12; // ID del cliente del que deseas obtener los pedidos
PedidoVenta.obtenerPedidosPorCliente(clienteID, (error, pedidos) => {
  if (error) {
    console.error(`Error al obtener pedidos/ventas del cliente con ID ${clienteID}:`, error);
  } else {
    console.log('Pedidos/ventas del cliente:', pedidos);
  }
});

// Obtener pedidos/ventas por id del empleado
const empleadoID = 2; // ID del empleado del que deseas obtener los pedidos
PedidoVenta.obtenerPedidosPorEmpleado(empleadoID, (error, pedidos) => {
  if (error) {
    console.error(`Error al obtener pedidos/ventas del empleado con ID ${empleadoID}:`, error);
  } else {
    console.log('Pedidos/ventas del empleado:', pedidos);
  }
});

// Actualizar pedido/venta
const pedidoID = 1; // ID del pedido/venta que deseas actualizar
const nuevoPedidoVentaData = {
  id_cliente: 12,
  fecha_hora: new Date(),
  tipo: 'Venta',
  estado: 'Completado',
  total: 150.00,
  metodo_pago: 2,
  id_empleado: 2
};
PedidoVenta.actualizarPedidoVenta(pedidoID, nuevoPedidoVentaData, (error, pedidoActualizado) => {
  if (error) {
    console.error(`Error al actualizar pedido/venta con ID ${pedidoID}:`, error);
  } else {
    console.log('Pedido/venta actualizado:', pedidoActualizado);
  }
});

// Obtener venta/pedido por ID
const pedidoID = 1; // ID del pedido/venta que deseas obtener
PedidoVenta.obtenerPorId(pedidoID, (error, pedido) => {
  if (error) {
    console.error(`Error al obtener pedido/venta con ID ${pedidoID}:`, error);
  } else {
    console.log('Pedido/venta:', pedido);
  }
});

// Obtener todos los pedidos/ventas
PedidoVenta.obtenerTodos((error, pedidos) => {
  if (error) {
    console.error('Error al obtener pedidos/ventas:', error);
  } else {
    console.log('Pedidos/ventas:', pedidos);
  }
});

// Agregar venta
const nuevoPedidoVenta = {
  id_cliente: 12,
  fecha_hora: new Date(),
  tipo: 'Venta',
  estado: 'Pendiente',
  total: 100.00,
  metodo_pago: 2,
  id_empleado: 2
};
PedidoVenta.agregarPedidoVenta(nuevoPedidoVenta, (error, pedidoID) => {
  if (error) {
    console.error('Error al agregar pedido/venta:', error);
  } else {
    console.log('ID del nuevo pedido/venta:', pedidoID);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador empleados.js---------------------->

// Obtiene empleados por su puesto
const puesto = 'Cajero'; // Puesto del que deseas obtener los empleados
Empleado.obtenerPorPuesto(puesto, (error, empleados) => {
  if (error) {
    console.error(`Error al obtener empleados con el puesto ${puesto}:`, error);
  } else {
    console.log(`Empleados con el puesto ${puesto}:`, empleados);
  }
});


// Elimina un empleado
const empleadoID = 1; // ID del empleado que deseas eliminar
Empleado.eliminarEmpleado(empleadoID, (error, mensaje) => {
  if (error) {
    console.error(`Error al eliminar empleado con ID ${empleadoID}:`, error);
  } else {
    console.log('Mensaje de eliminación:', mensaje);
  }
});

// Obtener los pedidos/ventas de un empleado usando su ID
const empleadoID = 1; // ID del empleado del que deseas obtener los pedidos
Empleado.obtenerPedidosPorEmpleado(empleadoID, (error, pedidos) => {
  if (error) {
    console.error(`Error al obtener pedidos/ventas del empleado con ID ${empleadoID}:`, error);
  } else {
    console.log('Pedidos/ventas del empleado:', pedidos);
  }
});

// Muestra al empleado que busques por ID
const empleadoID = 1; // ID del empleado que deseas obtener
Empleado.obtenerPorId(empleadoID, (error, empleado) => {
  if (error) {
    console.error(`Error al obtener empleado con ID ${empleadoID}:`, error);
  } else {
    console.log('Empleado:', empleado);
  }
});

// Muestra los empleados registrados
Empleado.obtenerTodos((error, empleados) => {
  if (error) {
    console.error('Error al obtener empleados:', error);
  } else {
    console.log('Empleados:', empleados);
  }
});

// Actualiza empleados
const empleadoID = 1; // ID del empleado que deseas actualizar
const nuevoEmpleadoData = {
  nombre: 'Pedro',
  apellido: 'González',
  correo_electronico: 'pedro@example.com',
  contraseña: 'newpassword456',
  puesto: 'Gerente',
  rol: 'Administrador',
  acceso_configuracion: true
};
Empleado.actualizarEmpleado(empleadoID, nuevoEmpleadoData, (error, empleadoActualizado) => {
  if (error) {
    console.error(`Error al actualizar empleado con ID ${empleadoID}:`, error);
  } else {
    console.log('Empleado actualizado:', empleadoActualizado);
  }
});

// Agregar empleado
const nuevoEmpleado = {
  nombre: 'Juan',
  apellido: 'Pérez',
  correo_electronico: 'juan@example.com',
  contraseña: 'password123',
  puesto: 'Cajero',
  rol: 'UsuarioRegular',
  acceso_configuracion: false
};
Empleado.agregarEmpleado(nuevoEmpleado, (error, empleadoID) => {
  if (error) {
    console.error('Error al agregar empleado:', error);
  } else {
    console.log('ID del nuevo empleado:', empleadoID);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador metodosPago.js---------------------->

// Eliminar metodo de pago
const metodoID = 1; // ID del método de pago que deseas eliminar
MetodoPago.eliminarMetodoPago(metodoID, (error, mensaje) => {
  if (error) {
    console.error(`Error al eliminar método de pago con ID ${metodoID}:`, error);
  } else {
    console.log('Mensaje de eliminación:', mensaje);
  }
});

// Actualizar metodo de pago
const metodoID = 1; // ID del método de pago que deseas actualizar
const nuevoMetodoPago = {
  nombreMetodo: 'Transferencia bancaria',
  descripcion: 'Pago mediante transferencia bancaria.',
  activo: true
};

MetodoPago.actualizarMetodoPago(metodoID, nuevoMetodoPago, (error, metodoActualizado) => {
  if (error) {
    console.error(`Error al actualizar método de pago con ID ${metodoID}:`, error);
  } else {
    console.log('Método de pago actualizado:', metodoActualizado);
  }
});

// Obtener todos los metodos de pago
MetodoPago.obtenerTodos((error, metodosDePago) => {
  if (error) {
    console.error('Error al obtener métodos de pago:', error);
  } else {
    console.log('Métodos de pago:', metodosDePago);
  }
});

// Obtener metodo de pago por ID
const metodoID = 1; // ID del método de pago que deseas obtener
MetodoPago.obtenerPorID(metodoID, (error, metodoDePago) => {
  if (error) {
    console.error(`Error al obtener método de pago con ID ${metodoID}:`, error);
  } else {
    console.log('Método de pago:', metodoDePago);
  }
});

// Ejemplo para agregar un metodo de pago
const nuevoMetodoPago = {
  nombreMetodo: 'Tarjeta de crédito',
  descripcion: 'MasterCard',
  activo: true
};
MetodoPago.agregarMetodoPago(nuevoMetodoPago, (error, metodoAgregado) => {
  if (error) {
    console.error('Error al agregar método de pago:', error);
  } else {
    console.log('Método de pago agregado:', metodoAgregado);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador usuarios.js---------------------->

// Ejemplo para eliminar un usuario
const idUsuarioAEliminar = 1; // ID del usuario a eliminar
Usuario.eliminarUsuario(idUsuarioAEliminar, (error, mensaje) => {
  if (error) {
    console.log('Hubo un error al eliminar el usuario:', error);
  } else {
    console.log(mensaje);
  }
});

// Ejemplo para actualizar un usuario
const idUsuario = 2; // ID del usuario a actualizar
const datosActualizados = {
  nombreUsuario: 'AleRata',
  contraseña: 'megustaelnepe',
  rol: 'UsuarioRegular'
};
Usuario.actualizarUsuario(idUsuario, datosActualizados, (error, usuario) => {
  if (error) {
    console.log('Hubo un error al actualizar el usuario:', error);
  } else {
    console.log('Usuario actualizado con éxito:', usuario);
  }
});

// Ejemplo para obtener un usuario por su nombre de usuario
const idUsuario = 2;
Usuario.obtenerIDUsuario(idUsuario, (error, usuario) => {
  if (error) {
    console.log('Hubo un error al obtener el usuario:', error);
  } else {
    console.log('Usuario obtenido con éxito:', usuario);
  }
});

// Ejemplo para obtener todos los usuarios
Usuario.obtenerTodos((error, usuarios) => {
  if (error) {
    console.log('Hubo un error al obtener los usuarios:', error);
  } else {
    console.log('Usuarios obtenidos con éxito:', usuarios);
  }
});

// Ejemplo para agregar un nuevo usuario
const nuevoUsuario = {
  nombreUsuario: 'SeñorB',
  contraseña: '123Sexoanal?',
  rol: 'Cajero'
};
Usuario.agregarUsuario(nuevoUsuario, (error, usuario) => {
  if (error) {
    console.log('Hubo un error al agregar el usuario:', error);
  } else {
    console.log('Usuario agregado con éxito:', usuario);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador catalogoProductos.js---------------------->

// Llamada al método para eliminar un producto
const idProducto = 13;
CatalogoProductos.eliminarProducto(idProducto, (error) => {
  if (error) {
    console.error(`Error al eliminar el producto con ID ${idProducto}:`, error);
  } else {
    console.log(`Producto con ID ${idProducto} eliminado con éxito.`);
  }
});

// Llamada al método para actualizar un producto
const idProducto = 13;
const nuevoProductoActualizado = {
  nombre: 'Manzana Golden',
  descripcion: 'Manzana dorada deliciosa',
  precio: 0.30,
  cantidadDisponible: 120,
  categoria: 'Comida'
};
CatalogoProductos.actualizarProducto(idProducto, nuevoProductoActualizado, (error, idProductoActualizado) => {
  if (error) {
    console.error(`Error al actualizar el producto con ID ${idProducto}:`, error);
  } else {
    console.log(`Producto con ID ${idProducto} actualizado con éxito.`);
  }
});

// Llamada al método para obtener la cantidad disponible de un producto
const idProducto = 13;
CatalogoProductos.obtenerCantidadDisponible(idProducto, (error, cantidadDisponible) => {
  if (error) {
    console.error(`Error al obtener la cantidad disponible del producto con ID ${idProducto}:`, error);
  } else {
    console.log(`Cantidad disponible del producto con ID ${idProducto}:`, cantidadDisponible);
  }
});

// Llamada al método para ordenar productos
const criterioOrdenamiento = 'precio'; // Reemplaza esto con un criterio de ordenamiento válido ('nombre', 'precio', 'categoria')
CatalogoProductos.ordenarProductos(criterioOrdenamiento, (error, productos) => {
  if (error) {
    console.error(`Error al ordenar productos por "${criterioOrdenamiento}":`, error);
  } else {
    console.log(`Productos ordenados por "${criterioOrdenamiento}":`, productos);
  }
});

// Llamada al método para buscar productos por categoría
const categoriaBuscar = 'Comida'; // Reemplaza esto con una categoría existente
CatalogoProductos.buscarPorCategoria(categoriaBuscar, (error, productos) => {
  if (error) {
    console.error(`Error al buscar productos en la categoría "${categoriaBuscar}":`, error);
  } else {
    console.log(`Productos encontrados en la categoría "${categoriaBuscar}":`, productos);
  }
});

// Llamada al método para obtener un producto por su ID
const idProducto = 13; // Reemplaza esto con el ID de un producto existente
CatalogoProductos.obtenerPorId(idProducto, (error, producto) => {
  if (error) {
    console.error(`Error al obtener el producto con ID ${idProducto}:`, error);
  } else {
    console.log(`Producto con ID ${idProducto} obtenido:`, producto);
  }
});

// Llamada al método para obtener todos los productos
CatalogoProductos.obtenerTodos((error, productos) => {
  if (error) {
    console.error("Error al obtener todos los productos:", error);
  } else {
    console.log("Productos obtenidos:", productos);
  }
});
// Llamada al método para obtener todos los productos
CatalogoProductos.obtenerTodos((error, productos) => {
  if (error) {
    console.error("Error al obtener todos los productos:", error);
  } else {
    console.log("Productos obtenidos:", productos);
  }
});

// Define un nuevo producto a agregar
const nuevoProducto = {
  nombre: '100 años',
  descripcion: 'Libro',
  precio: 10.25,
  categoria: 'Libros',
  stockDisponible: 100,
  stockMinimo: 10
};
// Llamada al método para agregar un nuevo producto
Producto.agregarProducto(nuevoProducto, (error, productoId) => {
  if (error) {
    console.error("Error al agregar el producto:", error);
  } else {
    console.log("Producto agregado con ID:", productoId);
  }
});

// Define un nuevo producto a agregar
const nuevoProducto = {
  nombre: 'Atun',
  descripcion: '350 gr',
  precio: 25.50,
  cantidadDisponible: 100,
  categoria: 'Comida'
};
// Llamada al método para agregar un nuevo producto
CatalogoProductos.agregarProducto(nuevoProducto, (error, productoId) => {
  if (error) {
    console.error("Error al agregar el producto:", error);
  } else {
    console.log("Producto agregado con ID:", productoId);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador clientes.js---------------------->

// Eliminar un cliente por su ID (reemplaza el ID con un valor válido)
const idClienteEliminar = 11; // Cambia esto al ID del cliente que quieras eliminar
Cliente.eliminarCliente(idClienteEliminar, (error, mensaje) => {
  if (error) {
    console.error(`Error al eliminar el cliente con ID ${idClienteEliminar}:`, error);
  } else {
    console.log(mensaje);
  }
});

// Actualizar un cliente existente (reemplaza el ID con un valor válido)
const idClienteActualizar = 10; // Cambia esto al ID del cliente que quieras actualizar
const nuevosDatosCliente = {
  nombre: 'María',
  apellido: 'González',
  correo: 'maria@example.com',
  telefono: '9876543210',
  direccion: 'Avenida Central 456'
};
Cliente.actualizarCliente(idClienteActualizar, nuevosDatosCliente, (error, clienteActualizado) => {
  if (error) {
    console.error(`Error al actualizar el cliente con ID ${idClienteActualizar}:`, error);
  } else {
    console.log(`Cliente con ID ${idClienteActualizar} actualizado:`, clienteActualizado);
  }
});

// Agregar un nuevo cliente
const nuevoCliente = {
  nombre: 'Diego',
  apellido: 'Ramos',
  correo: 'diego@example.com',
  telefono: '1234567890',
  direccion: 'Calle Lateral 134'
};
Cliente.agregarCliente(nuevoCliente, (error, clienteAgregado) => {
  if (error) {
    console.error('Error al agregar un nuevo cliente:', error);
  } else {
    console.log('Nuevo cliente agregado:', clienteAgregado);
  }
});

// Obtener un cliente por su ID (reemplaza el ID con un valor válido)
const idClienteBuscar = 10; // Cambia esto al ID del cliente que quieras buscar
Cliente.obtenerPorId(idClienteBuscar, (error, cliente) => {
  if (error) {
    console.error(`Error al obtener el cliente con ID ${idClienteBuscar}:`, error);
  } else {
    console.log(`Cliente con ID ${idClienteBuscar}:`, cliente);
  }
});

// Obtener todos los clientes
Cliente.obtenerTodos((error, clientes) => {
  if (error) {
    console.error('Error al obtener todos los clientes:', error);
  } else {
    console.log('Todos los clientes:', clientes);
  }
});

<------------------------- Codigos que corroboran el funcionamiento del controlador productoInventario.js---------------------->

// Supongamos que queremos obtener la cantidad de stock disponible del producto con un ID específico proporcionado por el usuario
const idProductoVerificar = 1002; // Aquí puedes cambiar el ID del producto según tu preferencia
// Llama al método verificarStock del modelo Producto para obtener la cantidad de stock disponible del producto especificado
Producto.verificarStock(idProductoVerificar, (error, hayStock) => {
  if (error) {
    console.error(`Error al obtener el stock del producto con ID ${idProductoVerificar}:`, error);
  } else {
    if (hayStock !== null) {
      console.log(`Cantidad de stock disponible del producto con ID ${idProductoVerificar}: ${hayStock}`);
    } else {
      console.log(`El producto con ID ${idProductoVerificar} no se encontró en la base de datos.`);
    }
  }
});

// Supongamos que queremos buscar productos en la categoría "Electrónicos"
const categoriaBuscar = "Libros"; // Aquí puedes cambiar la categoría según tu preferencia
// Llama al método obtenerCategoria del modelo Producto para buscar productos en la categoría especificada
Producto.obtenerCategoria(categoriaBuscar, (error, productos) => {
  if (error) {
    console.error(`Error al buscar productos en la categoría "${categoriaBuscar}":`, error);
  } else {
    if (productos.length === 0) {
      console.log(`No se encontraron productos en la categoría "${categoriaBuscar}".`);
    } else {
      console.log(`Productos encontrados en la categoría "${categoriaBuscar}":`, productos);
    }
  }
});

// Prueba de eliminacion por ID
const idProductoEliminar = 4;
// Llama al metodo eliminar producto por ID
Producto.eliminarProducto(idProductoEliminar, (error, productoElimina) => {
  if (error) {
    console.error('Error al eliminar producto por ID:', error);
  } else {
    console.log(message);
  }
});

// Prueba de eliminacion por categoria
const categoriaEliminar = 'Electrónica';
Producto.eliminarProductosPorCategoria(categoriaEliminar, (error, mensaje) => {
  if (error) {
    console.error('Error al eliminar producto por ID:', error);
  } else {
    console.log(message);
  }
});

// Supongamos que deseamos actualizar el producto con ID 1
const idProductoActualizar = 1002;
const nuevosDatosProducto = {
  nombre: 'Caguamas',
  descripcion: 'Cerveza 1Lt',
  precio: 48,
  categoria: 'Alcohol',
  stockDisponible: 100,
  stockMinimo: 5
};
// Llama al método actualizarProducto del modelo Producto
Producto.actualizarProducto(idProductoActualizar, nuevosDatosProducto, (error, productoActualizado) => {
  if (error) {
    console.error('Error al actualizar el producto:', error);
  } else {
    console.log('Producto actualizado:', productoActualizado);
    // Realiza otras operaciones o verifica la actualización en la base de datos
  }
});

// Ejemplo de consulta de prueba para seleccionar datos de una tabla
pool.query('SELECT * FROM "Productos/Inventario" LIMIT 10', (error, results) => {
  if (error) {
    console.error('Error al ejecutar la consulta:', error);
  } else {
    console.log('Datos seleccionados de la tabla "Productos/Inventario":', results.rows);
  }
});

// Agrega un nuevo producto
const nuevoProducto = {
  nombre: 'Camisa',
  descripcion: 'Camisa de algodón de manga corta',
  precio: 25.99,
  categoria: 'Ropa',
  stockDisponible: 100,
  stockMinimo: 10
};
Producto.agregarProducto(nuevoProducto, (error, productoId) => {
  if (error) {
    console.error('Error al agregar producto:', error);
  } else {
    console.log('ID del nuevo producto:', productoId);
  }
});

*/

