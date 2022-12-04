/*******************************************************************************************************/
/*******************************************************************************************************/
/***********************RUTAS PARA PETICIONES DE PROCESO DE AUTENTICACION*******************************/
/*******************************************************************************************************/
/*******************************************************************************************************/

const express = require("express");// Importar Framework express para Node Js
const router = express.Router(); //Importar Router de express para establecer las rutas (Controller)

const authController = require("../controllers/authController");
const authMidd = require("../middleware/authMidd");//Importar authMidd para poder usarlo 


/****************************************POST***********************************************************/
/*******************************************************************************************************/
router.post("/", authController.autenticarUsuario);/*****RUTA POST: AUTENTICA USUARIO Y GENERA TOKEN****/
/*******************************************************************************************************/
/*********ESTA RUTA POST => LLAMA A exports.AutenticarUsuario DESDE EL MODULO authController, **********/
/**********EL CUAL SE ENCARGA DE FIRMAR Y GENERAR EL TOKEN, MNEDIANTE LA FUNCION JWT.SIGN***************/
/*******************************************************************************************************/


/*****************************************GET***********************************************************/
/******RUTA GET: VERIFICA TOKEN Y PROCEDE A RETORNAR INFORMACION DEL USUARIO PREVIMENTE AUTENTICADO*****/
router.get("/", authMidd, authController.usuarioAutenticado);/******************************************/
/*************PRIMERO, MEDIANTE EL MODULO authMidd, VERIFICA QUE EL TOKEN SEA VALIDO********************/
/*************SEGUNDO: LLAMA A exports.usuarioAutenticado DESDE EL MODULO authController****************/
 /**********EL CUAL SE ENCARGA DE RETORNAR UN JSON CON TODA LA INFO DEL USUARIO AUTENTICADO*************/


/*********DEFINIR LAS RUTAS Y EXPORTARLAS**********/
module.exports = router;

