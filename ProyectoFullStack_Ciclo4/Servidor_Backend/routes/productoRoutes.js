/*******************************************************************************************************/
/*******************************************************************************************************/
/**************************RUTAS PARA PETICIONES DE LA TABLA PRODUCTOS*********************************/
/*******************************************************************************************************/
/*******************************************************************************************************/

const express = require("express");// Importar Framework express para Node Js
const router = express.Router(); //Importar Router de express para establecer las rutas (Controller)
const TproductoController = require("../controllers/TproductosController");
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
router.get("/",authMidd, TproductoController.getAllProductos);

/***********************************GET - CONSULTAR PRODUCTO BY ID*********************************/
/*******************************************************************************************************/
/**ESTE getProductoById ES USADO EN EL FRONT PARA LLAMAR UN SOLO PRODUCTO Y MEDIANTE SU ID PODER EJECUTAR
 * LAS OPERACIONES DEL DELETE(ID) Y UPDATE(ID)**********************************************************/
router.get("/:id",authMidd, TproductoController.getProductoById);

/******************************GET - CONSULTAR SET PRODUCTOS -FILTRADOS BY ID_CATEGORIA*****************/
/*******************************************************************************************************/
/**ESTE getAllProductosByCategoria ES USADO EN EL FRONT PARA LLAMAR UN CONJUNTO DE PRODUCTOS FILTRADOS
 * BY ID_CATEGORIA PARA LUEGO PINTARLOS EN UNA PAGINA DEL FRONT*****************************************/
router.get("/bycategoria/:id",authMidd, TproductoController.getAllProductosByCategoria);

/*****************************GET ALL PRODUCTOS SIN AUTH-MIDDLEWARE*************************************/
/**********ESTA RUTA ES PARA VER LOS PRODUCTOS EN EL HOME*PARA COMPRAS DEL CLIENTE**********************/
router.get("/home/cliente", TproductoController.getProductoHome);


/****************************************PUT***********************************************************/
/*******************************************************************************************************/
router.put("/:id",authMidd, TproductoController.updateProducto);


/****************************************DELETE BY URL /:id*********************************************/
/*******************************************************************************************************/
router.delete("/:id",authMidd, TproductoController.deleteProductoById_URL);


/*********DEFINIR LAS RUTAS Y EXPORTARLAS**********/
module.exports = router;