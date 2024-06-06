//Declaracion de variables de paquetes
const express = require('express')
const path = require('path')
const config = require('./src/config/config')
const bodyParser = require('body-parser')

//Creacion de la aplicacion de nodeJs con Express
const app = express() 

app.use(express.static(path.join(__dirname, './public'))) // Configuración para servir archivos estáticos desde la carpeta 'public'
app.set('port', config.PORT) //Asignacion del puerto a la aplicacion
app.use(express.json()) //asignacion de JSON's
app.use(bodyParser.urlencoded({ extended: true })) //Declaracion de Parseo para paginas
app.set('view engine', 'ejs') //Asignacion de motor de plantilla EJS
app.set('views', path.join(__dirname, '/src/views')) //Asignacion de la carpeta de vistas
app.set('trust proxy', 1) //Asignacion del proxy para la aplicacion

//Inicio de servicios WEB

app.get("/", async (req, res) => {
    res.render("index", {
        pageTitle: "Observatorio Tecnologico UPIITA"
    })
})

app.listen(config.PORT, () => {
    console.log(`Aplicacion corriendo en el puerto ${config.PORT}`)
})