/*******************************************************************************************************/
/*******************************************************************************************************/
/**************************RUTAS PARA PETICIONES DE LA TABLA PRODUCTOS*********************************/
/*******************************************************************************************************/
/*******************************************************************************************************/

const express = require("express");// Importar Framework express para Node Js
const router = express.Router(); //Importar Router de express para establecer las rutas (Controller)
const TproductoController = require("../controllers/TproductosController");
const Producto = require("../models/Tproductos");
const authMidd = require("../middleware/authMidd");

/***********************************POST - CREAR PRODUCTO***********************************************/
/*******************************************************************************************************/
router.post("/",authMidd, TproductoController.crearProducto);/*****RUTA POST: CREAR UN NEW PRODUCTO EN BBDD*******/
/*******************************************************************************************************/
/**********ESTA RUTA POST => LLAMA A exports.crearProducto DESDE const: productoController,*************/
/*******EL CUAL CONTIENE AL METODO producto.save(); DEL CRUD PARA CREAR AL USUARIO EN LA BBDD***********/
/*******************************************************************************************************/

/***********************************GET - CONSULTAR ALL PRODUCTOS BY CATEGORIA**************************/
/*******************************************************************************************************/
router.get("/",authMidd, TproductoController.getAllProductosByCategoria);

/***********************************GET - CONSULTAR ALL PRODUCTOS BY CATEGORIA**************************/
/*******************************************************************************************************/
/*router.get("/:id",authMidd, TproductoController.getAllProductosByCategoria);*/


/****************************************PUT***********************************************************/
/*******************************************************************************************************/
router.put("/:id",authMidd, TproductoController.updateProducto);


/****************************************DELETE BY URL /:id*********************************************/
/*******************************************************************************************************/
router.delete("/:id",authMidd, TproductoController.deleteProductoById_URL);


/*********DEFINIR LAS RUTAS Y EXPORTARLAS**********/
module.exports = router;