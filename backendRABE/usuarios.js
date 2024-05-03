const pool = require('../db_conection/db');
const bcrypt = require('bcrypt'); 

class Usuario {
    constructor(id, nombreUsuario, contraseñaHash, rol) {
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.contraseñaHash = contraseñaHash;
        this.rol = rol;
    }

    // Método para obtener todos los usuarios
    static obtenerTodos(callback) {
        pool.query('SELECT * FROM Usuarios', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    // Método para obtener un usuario por su nombre de usuario
    static obtenerIDUsuario(id, callback) {
        pool.query('SELECT * FROM Usuarios WHERE "ID" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    // Método para agregar un nuevo usuario
    static agregarUsuario(usuario, callback) {
        const { nombreUsuario, contraseña, rol } = usuario;
        // Hashear la contraseña antes de guardarla en la base de datos
        bcrypt.hash(contraseña, 10, (error, hash) => {
            if (error) {
                callback(error, null);
            } else {
                pool.query(
                    'INSERT INTO Usuarios ("NombreUsuario", "ContraseñaHash", "Rol") VALUES ($1, $2, $3) RETURNING *',
                    [nombreUsuario, hash, rol],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.rows[0]);
                        }
                    }
                );
            }
        });
    }

    // Método para actualizar un usuario
    static actualizarUsuario(id, nuevoUsuario, callback) {
        const { nombreUsuario, contraseña, rol } = nuevoUsuario;
        // Hashear la nueva contraseña antes de guardarla en la base de datos
        bcrypt.hash(contraseña, 10, (error, hash) => {
            if (error) {
                callback(error, null);
            } else {
                pool.query(
                    'UPDATE Usuarios SET "NombreUsuario" = $1, "ContraseñaHash" = $2, "Rol" = $3 WHERE "ID" = $4 RETURNING *',
                    [nombreUsuario, hash, rol, id],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.rows[0]);
                        }
                    }
                );
            }
        });
    }

    // Método para eliminar un usuario
    static eliminarUsuario(id, callback) {
        pool.query('DELETE FROM Usuarios WHERE "ID" = $1', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, `Usuario con ID ${id} eliminado con éxito.`);
            }
        });
    }
}

module.exports = Usuario;
