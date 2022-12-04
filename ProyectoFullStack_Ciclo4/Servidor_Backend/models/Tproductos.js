/************************************MONGOOSE - ORM*********************************************/
const mongoose = require("mongoose");/******IMPORTANDO EL ORM: OBJECT RELATIONAL MAPPING********/
/*MONGOOSE: SE ENCARGA DE LLEVAR Y RELACIONAR LOS OBJETOS DE ESTA CLASE MODELO=> A LA BBDD MONGODB*/
/***********************************************************************************************/


/**********************************CLASE MODELO => PRODUCTO*************************************/
/*********CREARNDO LA CLASE-MODELO QUE REPRESENTARA LA TABLA: PRODUCTO EN LA BBDD***************/
/********************SETTEANDO LAS PROPIEDADES DE CADA CAMPO DE LA TABLA************************/
const ProductosSchema = mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    descripcion: {type: String, required: true, trim: true},
    stock: {type: Number, required: true, trim: true},
    precio: {type: Number, required: true, trim: true},
    imagen: {type: String, required: true, trim: true},
    creado: {type: Date, default: Date.now()},
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: "Categoria"}
});/********************************************************************************************/


/********************DEFINIR NOMBRE DEL MODELO "Producto" Y EXPORTARLO**************************/
module.exports = mongoose.model("Producto", ProductosSchema)/***********************************/
/***********************************************************************************************/


/************************PROPIEDADES DE LA TABLA PRODUCTO:**************************************/
/**********type: String => Almacena datos de tipo String****************************************/
/**********require: true => No acepta nullos****************************************************/
/**********type: Date => Tipo fecha*************************************************************/
/**********default: true => Formato por default MM/DD/YY/***************************************/
/**********trim: true => Elimina los espacios y almacena en BD todo junto***********************/
/***********************************************************************************************/