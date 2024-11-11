// Conexion a la base de datos MySQL
const mysql = require('mysql2');

// Configura los parámetros de conexión
const pool = mysql.createPool({
    host: 'localhost', // Dirección de la base de datos
    port: 3306,        // Puerto predeterminado de MySQL
    user: 'root',      
    password: '02Diegorg?', 
    database: 'RABE', 
    waitForConnections: true,
    connectionLimit: 10,      // Número máximo de conexiones simultáneas
    queueLimit: 0
});

// Prueba la conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
    connection.release(); // Libera la conexión
});

// Exporta el pool para utilizarlo en otros archivos
module.exports = pool;
