// Importación de módulos necesarios
const express = require('express');
const path = require('path');

// Inicialización de la aplicación Express
const app = express();
const port = 3000;

// Configuración para procesar los datos del formulario en formato URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configuración para servir archivos estáticos (como CSS, imágenes etc) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta GET para servir el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Envía el archivo 'index.html' como respuesta
});

// Ruta POST para procesar los datos del formulario enviados desde 'index.html'
app.post('/registro', (req, res) => {
    // Extrae los datos del formulario del cuerpo de la solicitud (req.body)
    const { nombre, edad, correo, curso } = req.body;
    
    //Realiza validacion para que los campos no esten vacios
    if (!nombre || !edad || !correo || !curso) {
        return res.status(400).send('<h1>Error: Todos los campos son obligatorios.</h1>');
    }

    // Validacion de correo
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Si el correo no coincide con el formato de validacion, envia un mensaje de error
    if (!emailRegex.test(correo)) {
        return res.status(400).send('<h1>Error: Correo electrónico no válido.</h1>');
    }

    // Si todas las validaciones pasan, envía una página de confirmación con los datos ingresados
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
// Este middleware se ejecuta si ninguna de las rutas anteriores coincide con la solicitud
app.use((req, res) => {
    res.status(404).send('<h1>404: Página no encontrada</h1>');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
