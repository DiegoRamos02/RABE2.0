const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Importa y usa tus controladores
const clientesController = require('./clientesController'); // Listo, funciono correctamente
const empleadosController = require('./empleadosController'); // Listo, funciono correctamente
const metodosPagoController = require('./metodosPagoController'); // Listo, funciono correctamente
const pedidosController = require('./pedidoVentaController'); // Listo, funciono correctamente
const productosController = require('./productoInventarioController'); // Listo, funciono correctamente
const ticketsController = require('./ticketsController');   // Listo, funciono perfectamente
const usuariosController = require('./usuariosController'); // Listo, funciono perfectamente
// Importa otros controladores de la misma manera

// Configura las rutas (ejemplo)
app.use('/api/clientes', clientesController);
app.use('/api/empleados', empleadosController);
app.use('/api/metodosPago', metodosPagoController);
app.use('/api/pedidos', pedidosController);
app.use('/api/productos', productosController);
app.use('/api/tickets', ticketsController);
app.use('/api/usuarios', usuariosController);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
