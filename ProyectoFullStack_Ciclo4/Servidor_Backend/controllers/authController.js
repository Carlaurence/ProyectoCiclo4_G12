/***********************************************************************/
/***********************************************************************/
/*********************FIRMAR Y GENERAR EL TOKEN*************************/
/*********************FIRMAR Y GENERAR EL TOKEN*************************/
/*********************FIRMAR Y GENERAR EL TOKEN*************************/
/*********EL MODULO "authController.js" ES EL ENCARGADO DE *************/
/*********LA AUTENTICACION DE USUARIO Y DE GENERAR EL TOKEN*************/
/*********LA AUTENTICACION DEL USUARIO Y GENERACION DEL TOKEN***********/
/********************SE REALIZA CON JWT.SIGN****************************/
/*****************GENERADOR DE TOKENS - JWS.SIGN************************/
/***********************************************************************/
/***********************************************************************/

const Usuario = require("../models/Tusuarios"); //IMPORTAR MODELO "Usuario" DE ARCHIVO /models
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");//Importar libreria jsonwebtoken para crear la firma digital
require("dotenv").config({path: "variables.env"}); //importar libreria de dotenv para poder ejecutar las variables de entorno


exports.autenticarUsuario = async (req, res) => {//Proceso para autenticar el usuario
    //console.log(req.body);
    const {password, email} = req.body; //Traer desde el body, el password y el email

    try{

        //Confirmar mediante el email si usuario existe, para proceder a Autenticar 
        let usuario = await Usuario.findOne({email});
        if(!usuario){//Si el usuario NO existe
            return res.status(404).json({msg: "WARNING: El usuario No existe!"})
        }

        //Comparar si el password ingresado es = passwordCorrecto para proceder a Autenticar
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passwordCorrecto){
            return res.status(404).json({msg: "WARNING: Password incorrecto!"});
        } 
        //console.log("Usuario ingreso correctamente");
        //Si usuario y password son correctos: Firmar y Crear un TOKEN para que usuario pueda ingresar
        //Los TOKEN son algoritmos que geenran TOKENS
        //Libreria/ Dependencia: jsonwebtoken

        const payload = {//payload => Almacena un json con el ID del usuario
            usuario: {id: usuario.id}
        }; 
        //res.json(payload);//res => Responde en postman con el ID 
        //NOTA: "res" => es la respuesta que envia el backend a la consola de postman

        jwt.sign(//jwt.sign se encarga de hacer la firma digital y generar el token seteado con un tiempo de expiracion
            payload,//Almacena un json con el ID del usuario
            process.env.SECRETA,
            {
                expiresIn: '30d',// Setteado en segundos,. = 1 minuto
                //La duracion del Token se puede settear de diferentes formas: EJEMPLO '3d', '365d', '1m' o en segundos
            },
            (error, token) => {
                if(error) throw error;
                //Mensaje de confirmacion
                res.json({token});
            }
        );

    }catch(error){
        console.log(error);
    }
};


exports.usuarioAutenticado = async (req, res) => {//Proceso despues de haber ya autenticado el usuario
    try{
        const usuario = await Usuario.findById(req.usuario.id);//Va a la BBDD a consultar el usuario por ID
        res.json({usuario});//Y luego lo retorna con toda la informacion relacionada a ese usuario
    }catch(error){
        res.status(500).json({msg: "Hubo un error"});
    }
}