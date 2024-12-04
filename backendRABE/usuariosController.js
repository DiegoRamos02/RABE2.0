const express = require('express');
const router = express.Router();
const Usuario = require('./usuarios');
const pool = require('./');

// Endpoint para manejar el inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca el usuario en la base de datos
        pool.query('SELECT * FROM Usuarios WHERE NombreUsuario = ?', [username], async (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error del servidor', error });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = results[0];

            // Verifica la contraseña usando bcrypt
            const isMatch = await bcrypt.compare(password, user.ContraseñaHash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // Devuelve los datos del usuario (puedes generar un token aquí si usas JWT)
            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                userId: user.ID,
                username: user.NombreUsuario,
                rol: user.Rol,
            });
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
});

// Obtener todos los usuarios
router.get('/', (req, res) => {     // Funciono correctamente
    Usuario.obtenerTodos((error, usuarios) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(usuarios);
        }
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {  // Funciono correctamente
    const id = req.params.id;
    Usuario.obtenerIDUsuario(id, (error, usuario) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(usuario);
        }
    });
});

// Agregar un nuevo usuario
router.post('/', (req, res) => {    // Funciono correctamente
    const nuevoUsuario = req.body;
    Usuario.agregarUsuario(nuevoUsuario, (error, usuario) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(usuario);
        }
    });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {      // Funciono correctamente
    const id = req.params.id;
    const nuevoUsuario = req.body;
    Usuario.actualizarUsuario(id, nuevoUsuario, (error, usuarioActualizado) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(usuarioActualizado);
        }
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {       // Funciono correctamente
    const id = req.params.id;
    Usuario.eliminarUsuario(id, (error, mensaje) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json({ mensaje });
        }
    });
});

// Obtener un usuario por su nombre de usuario
router.get('/nombre/:nombreUsuario', (req, res) => {    // Funciono correctamente
    const nombreUsuario = req.params.nombreUsuario;
    Usuario.obtenerPorNombreUsuario(nombreUsuario, (error, usuario) => {
        if (error) {
            res.status(404).json({ error: error.message });
        } else {
            res.json(usuario);
        }
    });
});

module.exports = router;
