/***************************************************************************************/
/*******************************VERIFICACION DE TOKEN***********************************/
/********************FUNCION MIDDLEWARE - VERIFICACION DE TOKEN*************************/
/********************LOS MIDDLEWARE SON FUNCIONES DE ENTRADA POR SALIDA*****************/
/*********EL MODULO "authMidd.js" ES EL ENCARGADO LA VERIFICACION DEL TOKEN*************/
/************LA VERIFICACION DEL TOKEN SE REALIZA CON JWT.VERIFY************************/
/***************************************************************************************/
/***************************************************************************************/

const jwt = require("jsonwebtoken");    

module.exports = function (req, res, next){
    //req => requerimiento: Traer informacion desde Postman
    //res => respuesta: Enviar informacion hacia la consola de postman

    const token = req.header("x-auth-token");//Traer y Almacenar el {Value:TOKEN} desde el header de Postman donde la {Key:x-auth-token}    
    //console.log(token);//log => Solo para comprobar que trae el token desde postman
    
    if(!token){//Si => TOKEN retorna vacio desde Postman =>
        return res.status(400).json({msg: "no hay token"});
    }

    try{//Si => TOKEN retorna con algun contenido => verificar token con autenticador jwt.verify
        const cifrado = jwt.verify(token, process.env.SECRETA)//cifrado => Almacena el PAYLOAD DATA del JWT.io
        //console.log(cifrado);//Solo para confirmar la informacion de cifrado
        req.usuario = cifrado.usuario;
        //console.log(cifrado.usuario);//Solo confirmar que cifrado.usuario, devuelva el id del usuario
        next();//Este next() hace que el Middleware salga y nos regresa A auth.js, router.get()

    }catch(error){//Si => TOKEN no puede ser autenticado por JWT =>
        res.status(400).json({msg: "token no valido"});
    }   
}
/*********************************************************************************************/
/********************LAS FUNCIONES MIDDLEWARE SALEN CON EL COMANDO next();********************/
/************Este next() ME REGRESAR A auth.js, ESPECIFICAMENTE AL router.get()***************/
/*********************************************************************************************/