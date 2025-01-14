// Importar los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar CORS

// Inicializar la aplicación
const app = express();
const PORT = 3001;

// Middleware para habilitar CORS
app.use(cors({
    origin: 'https://login-cfd7.onrender.com', // Permitir solicitudes desde este dominio
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
}));

// Manejar solicitudes preflight para CORS
app.options('/validate-password', cors()); 

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Función para validar contraseñas
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres.');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe incluir al menos una letra mayúscula.');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('La contraseña debe incluir al menos una letra minúscula.');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe incluir al menos un número.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('La contraseña debe incluir al menos un carácter especial.');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Ruta para validar contraseñas
app.post('/validate-password', (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            error: 'Se requiere una contraseña.'
        });
    }

    const result = validatePassword(password);
    res.json(result);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El microservicio de validación de contraseñas está funcionando en el puerto ${PORT}`);
});
