/************************************MONGOOSE - ORM*********************************************/
const mongoose = require("mongoose");/******IMPORTANDO EL ORM: OBJECT RELATIONAL MAPPING********/
/*MONGOOSE: SE ENCARGA DE LLEVAR Y RELACIONAR LOS OBJETOS DE ESTA CLASE MODELO=> A LA BBDD MONGODB*/
/***********************************************************************************************/


/**********************************CLASE MODELO => CATEGORIA************************************/
/*********CREARNDO LA CLASE-MODELO QUE REPRESENTARA LA TABLA: CATEGORIA EN LA BBDD**************/
/********************SETTEANDO LAS PROPIEDADES DE CADA CAMPO DE LA TABLA************************/
const CategoriaSchema = mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    imagen: {type: String, required: true, trim: true},
    creador: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    creado: {type: Date, default: Date.now()}
});/********************************************************************************************/


/********************DEFINIENDO NOMBRE DEL MODELO "Categoria" Y EXPORTALO***********************/
module.exports = mongoose.model("Categoria", CategoriaSchema)
/***********************************************************************************************/


/************************PROPIEDADES DE LA TABLA CATEGORIA:*************************************/
/**********type: String => Almacena datos de tipo String****************************************/
/**********require: true => No acepta nullos****************************************************/
/**********type: Date => Tipo fecha*************************************************************/
/**********default: true => Formato por default MM/DD/YY/***************************************/
/**********trim: true => Elimina los espacios y almacena en BD todo junto***********************/
/***********************************************************************************************/
