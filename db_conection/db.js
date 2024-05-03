// Conexion a la base de datos
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost', // La direccion de la base de datos, en este caso es el mismo equipo
  port: 5432,
  user: 'postgres',
  password: '02Diegorg?',
  database: 'RABE'
});

// Aqui hacemos la conexion a la base de datos
pool.connect(err => {
  if (err) {
    console.error('Error de conexión', err.stack);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Exportamos la instancia pool para poder utilizarla en otros archivos del proyecto
module.exports = pool; 


