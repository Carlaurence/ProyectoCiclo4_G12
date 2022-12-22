/*******************************************************************************************************/
/*******************************************************************************************************/
/**************************RUTAS PARA PETICIONES DE LA TABLA CATEGORIAS*********************************/
/*******************************************************************************************************/
/*******************************************************************************************************/

const express = require("express");// Importar Framework express para Node Js
const router = express.Router(); //Importar Router de express para establecer las rutas (Controller)
const TcategoriaController = require("../controllers/TcategoriaController");
const authMidd = require("../middleware/authMidd");

/****************************************POST***********************************************************/
/*******************************************************************************************************/
router.post("/",authMidd, TcategoriaController.crearCategoria);/*****RUTA URL PETICION POST*************/
/*******************************************************************************************************/
/**********ESTA RUTA POST => LLAMA A exports.crearCategoria DESDE const: usuarioController,*************/
/*******EL CUAL CONTIENE AL METODO categoria.save(); DEL CRUD PARA CREAR AL USUARIO EN LA BBDD**********/
/*******************************************************************************************************/


/****************************************GET CATEGORIA BY CREADOR***************************************/
/*******************************************************************************************************/
//router.get("/",authMidd, TcategoriaController.getCategoriasByCreador);

/****************************************GET CATEGORIA BY NOMBRE-CATEGORIA EN URL***********************/
/*******************************************************************************************************/
//router.get("/:nombre",authMidd, TcategoriaController.getCategoriasByNombre);

/****************************************GET CATEGORIA BY idCategoria EN URL***************************/
/*******************************************************************************************************/
router.get("/:id",authMidd, TcategoriaController.getCategoriasByidCategoria);


/*************************GET TODAS LAS CATEGORIAS CON AUTH-MIDDLEWARE**********************************/
/*******************************************************************************************************/
router.get("/",authMidd, TcategoriaController.getAllCategorias);

/*****************************GET ALL CATEGORIAS SIN AUTH-MIDDLEWARE************************************/
/******************ESTA RUTA ES PARA VER LAS CATEGORIAS EN EL HOME**************************************/
router.get("/home/cliente", TcategoriaController.getCategoriasHome);


/****************************************PUT-UPDATE*****************************************************/
/*******************************************************************************************************/
router.put("/:id",authMidd, TcategoriaController.updateCategoria);

/****************************************DELETE BY URL /:id*********************************************/
/*******************************************************************************************************/
router.delete("/:id",authMidd, TcategoriaController.deleteCategoriaById_URL);

/****************************************DELETE BY JSON{"_id": ""}**************************************/
/*******************************************************************************************************/
//router.delete("/",authMidd, TcategoriaController.deleteCategoriaByJson);


/*********DEFINIR LAS RUTAS Y EXPORTARLAS**********/
module.exports = router;