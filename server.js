const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuración para manejar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para procesar los datos del formulario
app.post('/registro', (req, res) => {
    const { nombre, edad, correo, curso } = req.body;
    
    if (!nombre || !edad || !correo || !curso) {
        return res.status(400).send('<h1>Error: Todos los campos son obligatorios.</h1>');
    }

    // Validación de correo
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).send('<h1>Error: Correo electrónico no válido.</h1>');
    }

    res.send(`
    <html>
        <head>
            <title>Confirmación de Registro</title>
            <link rel="stylesheet" type="text/css" href="styles_1.css">
        </head>
        <body>
            <h2>Registro Exitoso</h2>
            <div>
                <p><strong>Nombre Completo:</strong> ${nombre}</p>
                <p><strong>Edad:</strong> ${edad}</p>
                <p><strong>Correo Electrónico:</strong> ${correo}</p>
                <p><strong>Curso:</strong> ${curso}</p>
                <a href="/">Volver al formulario</a>
            </div>
        </body>
    </html>
    `);
});

// Ruta para manejar errores 404
app.use((req, res) => {
    res.status(404).send('<h1>404: Página no encontrada</h1>');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
