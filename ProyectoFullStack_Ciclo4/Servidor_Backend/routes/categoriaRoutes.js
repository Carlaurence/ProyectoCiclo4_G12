/*******************************************************************************************************/
/*******************************************************************************************************/
/**************************RUTAS PARA PETICIONES DE LA TABLA CATEGORIAS*********************************/
/*******************************************************************************************************/
/*******************************************************************************************************/

const express = require("express");// Importar Framework express para Node Js
const router = express.Router(); //Importar Router de express para establecer las rutas (Controller)
const TcategoriaController = require("../controllers/TcategoriaController");
const authMidd = require("../middleware/authMidd");
const Categoria = require("../models/Tcategoria");

/****************************************POST***********************************************************/
/*******************************************************************************************************/
router.post("/",authMidd, TcategoriaController.crearCategoria);/*****RUTA URL PETICION POST*************/
/*******************************************************************************************************/
/**********ESTA RUTA POST => LLAMA A exports.crearCategoria DESDE const: usuarioController,*************/
/*******EL CUAL CONTIENE AL METODO categoria.save(); DEL CRUD PARA CREAR AL USUARIO EN LA BBDD**********/
/*******************************************************************************************************/


/****************************************GET CATEGORIA BY CREADOR***************************************/
/*******************************************************************************************************/
router.get("/",authMidd, TcategoriaController.getCategoriasByCreador);

/****************************************GET TODAS LAS CATEGORIAS***************************************/
/*******************************************************************************************************/
router.get("/all",authMidd, TcategoriaController.getAllCategorias);


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