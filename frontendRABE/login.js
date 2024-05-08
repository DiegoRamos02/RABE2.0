
// Maneja la solicitud de inicio de sesión
function iniciarSesion(nombreUsuario, contraseña, callback) {
    // Aquí puedes realizar la lógica de autenticación en el backend
    // Por ahora, solo simularemos un inicio de sesión exitoso
    const usuario = { nombreUsuario: 'usuario', contraseña: 'contraseña' };
    if (nombreUsuario === usuario.nombreUsuario && contraseña === usuario.contraseña) {
        // Inicio de sesión exitoso
        callback(null, usuario);
    } else {
        // Credenciales incorrectas
        callback(new Error('Credenciales incorrectas'));
    }
}

function handleLogin(event) {
    event.preventDefault();
    const nombreUsuario = document.getElementById('username').value;
    const contraseña = document.getElementById('password').value;

    iniciarSesion(nombreUsuario, contraseña, (error, usuario) => {
        if (error) {
            // Manejar el error
            console.error(error);
        } else if (usuario) {
            // Inicio de sesión exitoso, redirigir a la página principal
            window.location.href = 'mainPage.html';
        } else {
            // Credenciales incorrectas, mostrar mensaje al usuario
            alert('Nombre de usuario o contraseña incorrectos');
        }
    });
}

document.getElementById('login-form').addEventListener('submit', handleLogin);


