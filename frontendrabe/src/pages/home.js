import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes manejar la lógica de cierre de sesión
        console.log('Logout');
        navigate('/');
    };

    return (
        <div>
            <h1>Bienvenido a la Página de Inicio</h1>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Home;
