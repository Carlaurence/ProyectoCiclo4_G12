/********************************************************************************************************/
/***************************************CRUD - TABLA: USUARIOS*******************************************/
/*******************************ESTE MODULO CONTIENE EL CRUD REPOSITORY**********************************/
/********************************************************************************************************/

const Usuario = require("../models/Tusuarios"); //IMPORTAR MODELO "Usuario" DE ARCHIVO /models
const bcryptjs = require("bcryptjs");

/********************************************************************************************************/
/**********************CREAR USUARIO => exports.crearUsuario => SE ENCARGA DE:***************************/
/**************1- VERIFICAR QUE EL USUARIO NO ESTE CREADO EN LA BBDD*************************************/
/**************2- HASHEAR / ENCRIPTAR EL PASSWORD CREADO POR EL NEW USUARIO******************************/
/**************3- CREAR EL NUEVO USUARIO CON EL METODO usuario.save() DEL CRUD***************************/
/*************************************http://URL/api/usuarios/*******************************************/
/********************************************************************************************************/
exports.crearUsuario = async (req, res) => {
    //console.log(req.body);//Solo para confirmar informacion
    const {password, email} = req.body; 

    try{

        //Confirmar si Email de Usuario ya existe
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(404).json({msg: "WARNING: El usuario ya existe!"})
        }

        //crear un nuevo usuario
        usuario = new Usuario(req.body);

        //hash: Para hashear o encriptar el password con 10 vueltas 
        usuario.password = await bcryptjs.hash(password, 10);

        //Guardar en la Base de Datos
        const usuarioAlmacenado = await usuario.save();

        res.json(usuarioAlmacenado);

    }catch(error){
        console.log(error);
        res.status(404).json({msg: "El usuario ya existe y/o la Contrasena es incorrecta"});
    }
    
};