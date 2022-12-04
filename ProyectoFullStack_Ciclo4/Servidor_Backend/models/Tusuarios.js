const mongoose = require("mongoose");


//Forma de crear un Schema / Tabla
const UsuariosSchema = mongoose.Schema({
    nombre:{type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    registro: {type: Date, default: Date.now()}

});
/*****************PROPIEDADES******************/
//trim: true es una propiedad para eliminar espacios en la informacion recibida y almacenar en la BD sin espacios
//required: true es una propiedad para que no manden nullos o vacios. igual que el NOT NULL
//unique: true. propiedad para evitar que se repita esa informacion. ejemplo: un correo electronico no se puede repetir
//MongoDB nos crea ID automaticamente
//Todas estas propiedades se encuentran en https://mongoosejs.com/docs/guide.html

/*********DEFINIR NOMBRE DEL MODELO "Usuario" Y LO EXPORTA**********/
module.exports = mongoose.model("Usuario", UsuariosSchema)
