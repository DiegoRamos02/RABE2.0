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
    static obtenerTodos(callback) {             // Funciono correctamente
        pool.query('SELECT * FROM Usuarios', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results); // Accedemos directamente a results en MySQL
            }
        });
    }

    // Método para obtener un usuario por su ID
    static obtenerIDUsuario(id, callback) {     // Funciono correctamente
        pool.query('SELECT * FROM Usuarios WHERE ID = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0]); // Accede directamente al primer resultado en MySQL
            } else {
                callback(new Error('Usuario no encontrado'), null);
            }
        });
    }

    // Método para agregar un nuevo usuario
    static agregarUsuario(usuario, callback) {      // Funciona correctamente
        const { nombreUsuario, contraseña, rol } = usuario;

        // Hashear la contraseña antes de guardarla en la base de datos
        bcrypt.hash(contraseña, 10, (error, hash) => {
            if (error) {
                callback(error, null);
            } else {
                pool.query(
                    'INSERT INTO Usuarios (NombreUsuario, ContraseñaHash, Rol) VALUES (?, ?, ?)',
                    [nombreUsuario, hash, rol],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            const nuevoUsuario = {
                                id: results.insertId, // Obtener el ID generado automáticamente
                                nombreUsuario,
                                rol,
                            };
                            callback(null, nuevoUsuario);
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
                    'UPDATE Usuarios SET NombreUsuario = ?, ContraseñaHash = ?, Rol = ? WHERE ID = ?',
                    [nombreUsuario, hash, rol, id],
                    (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else if (results.affectedRows > 0) {
                            // Si se actualizaron filas, devolvemos los datos del usuario actualizado
                            const usuarioActualizado = {
                                id,
                                nombreUsuario,
                                rol,
                            };
                            callback(null, usuarioActualizado);
                        } else {
                            callback(new Error('Usuario no encontrado'), null);
                        }
                    }
                );
            }
        });
    }

    // Método para eliminar un usuario
    static eliminarUsuario(id, callback) {      // Funciono correctamente
        pool.query('DELETE FROM Usuarios WHERE ID = ?', [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.affectedRows > 0) {
                callback(null, `Usuario con ID ${id} eliminado con éxito.`);
            } else {
                callback(new Error(`Usuario con ID ${id} no encontrado`), null);
            }
        });
    }

    // Método para obtener un usuario por su nombre de usuario
    static obtenerPorNombreUsuario(nombreUsuario, callback) {
        pool.query('SELECT * FROM Usuarios WHERE NombreUsuario = ?', [nombreUsuario], (error, results) => {
            if (error) {
                callback(error, null);
            } else if (results.length > 0) {
                callback(null, results[0]); // Accede directamente al primer resultado en MySQL
            } else {
                callback(new Error('Usuario no encontrado'), null);
            }
        });
    }
}

module.exports = Usuario;
