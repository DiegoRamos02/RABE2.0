const { app, BrowserWindow } = require('electron');
const path = require('path');

// Función para crear una nueva ventana de Electron
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Cargar la interfaz de inicio de sesión cuando se inicie la aplicación
    win.loadFile('frontendRABE/login.html');
}

// Ejecutar la función createWindow cuando la aplicación esté lista
app.whenReady().then(createWindow);

// Salir de la aplicación cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Crear una nueva ventana cuando la aplicación se active en macOS y no haya ventanas abiertas
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
