/****************************************************************************************/
/****************************************************************************************/
/****************INDEX.JS ES LA PUERTA DE ENTRADA A LA EJECUCION DEL BACK****************/
 /***************EL PROGAMA SE EJECUTA SIGUIENDO LA SECUNCIA DE LAS LINEAS***************/
 /***************************************************************************************/
 /***************************************************************************************/



//Froma de importar librerias en Express con la palabra const.
const express = require("express");
const connectDB = require("./config/db"); //Importamos la libreria para poder llamar a la clase 
const usuarioRoutes = require("./routes/usuarioRoutes");// Hacemos el llamado de usuarioRoutes de la misma carpeta routes 
const authRoutes = require("./routes/authRoutes");// Hacemos el llamado de auth de la misma carpeta routes
const categoriaRoutes  = require("./routes/categoriaRoutes")//Importamos la Lib categoriaRoutes en la const: categoriaRoutes 
const productoRoutes = require("./routes/productoRoutes")//Importamos la Lib productoRoutes en la const: productoRoutes
//Para conectar el front y el back se debe cumplir con una politica de CORS
//tenemos que habilitar los CORS
//importamos la libreria/dependencia de los CORS npm i cors
const cors = require("cors");

const app = express();
app.use(express.json({extended: true}));

//Aqui hacemos el llamado require de la conexion db.js
connectDB();
//habilitamos los cors justo AQUI
app.use(cors());

//Construccion de Rutas / Url's
//NOTA: Una url puede contener varios verbos - peticiones Get. Post, Put, Delete
app.use("/api/usuarios", usuarioRoutes);//RUTA URL USUARIOS
app.use("/api/auth", authRoutes);//RUTA URL AUTH
app.use("/api/categorias", categoriaRoutes);//RUTA URL CATEGORIAS
app.use("/api/productos", productoRoutes);//RUTA URL PRODUCTOS

app.listen(4000, () => {
    console.log("servidor esta corriendo por el puerto 4000")
});