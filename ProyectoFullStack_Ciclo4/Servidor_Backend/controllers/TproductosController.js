/***********************************************************************************************************/
/***************************************API_REST - TABLA: PRODUCTO******************************************/
/****************************ESTE MODULO CONTIENE EL CRUD GET, PUT, POST, DELET*****************************/
/***********************************************************************************************************/

const { response } = require("express");/*IMPORTAR EL FRAMEWORK DE NODE.JS**********************************/
const Producto = require("../models/Tproductos"); /*****IMPORTAR MODELO "Producto" DE CARPETA /models*******/


/************************************PETICION: POST - CREAR NEW PRODUCTO************************************/
/*******************exports.crearProducto => SE ENCARGA DE:*************************************************/
/********1- REQUERIR EL JSON {nombre} DESDE LA CONSOLA DEL POSTMAN O DESDE EL FRONT*************************/
/********2- REALIZAR UNA BUSQUEDA DE PRODUCTOS EN LA BBDD MEDIANTE EL {nombre}******************************/
/********3- VERIFICAR QUE EL PRODUCTO NO ESTE REPETIDO EN LA BBDD*******************************************/
/********4- REQUERIR EL JSON {req.body} COMPLETO A LA CANSOLA DE POSTMAN PARA CREAR EL NEW PRODUCTO*********/
/********5- IMPLEMENTAR EL SERVICIO producto.save() PARA REGISTRAR UN NEW PRODUCTO EN LA BBDD***************/
/***************************************http://URL/api/productos/ + [POST]**********************************/
/***********************************************************************************************************/
exports.crearProducto = async(req, res) => {
    /*EL USUARIO DEBE INICIAR EL REQUEST POST INGRESANDO EL JSON {} CON LA INFO DEL PRODUCTO AL POSTMAN*****/
    const {nombre} = req.body;/*******req.body => TRAER DATO DEL CAMPO {nombre}: DESDE EL POSTMAN***********/
    try{/*****************TRY/CATCH: CADA QUE SE HAGA UN REQUEST A LA BBDD SE DEBE UTILIZAR ****************/
        let producto = await Producto.findOne({nombre});/**BUSCAR SI EL {nombre} YA EXISTE EN LA BBDD*******/
        /********************CONDICION IF: VERIFICAR QUE LA CATEGORIA NO ESTE REPETIDA EN LA BBDD***********/
        if(producto){/******SI EL PRODUCTO YA EXISTE => ENTONCES =>*****************************************/
            return res.status(404).json({msg: "WARNING: El Producto ya existe en la base de datos"})
        }
        /****SI EL PRODUCTO NO EXISTE => ENTONCES => PROCEDA A LA SIGUIENTE INSTRUCCION =>******************/
        producto = new Producto(req.body);/*req.body =>TRAER DATOS DESDE POSTMAN/FRONT Y CREAR NEW PRODUCTO*/
        const productoAlmacenado = await producto.save();/*CREAR NEW PRODUCTO EN LA BBDD CON METODO SAVE()**/
        res.json(productoAlmacenado);/*res.json=> RETORNA RESPUESTA AL POSTMAN O FRONT CON LA INFO DEL PROD*/
    }catch(error){/**SI NO SE DILIGENCIAN TODOS LOS CAMPOS OBLIGATORIOS => CATCH ERROR**********************/
        res.status(404).json({msg: "ERROR: Datos incompletos. Todos los campos son obligatorios"});/*RETORNA RESPUESTA AL POSTMAN/FRONT*/
    }/***********************************FIN METODO POST - CREAR NEW PRODUCTO********************************/
};/**********************************************************************************************************/



/***********************PETICION: GET [TODOS LOS PRODUCTOS] BY CATEGORIA************************************/
/***********************getAllProductosByCategoria => SE ENCARGA DE:****************************************/
/*1- EL USUARIO DEBE INGRESAR UN JSON {"id": "id_categoria"} EN CONSOLA DEL POSTMAN*************************/
/*2- REQUERIR EL JSON {"id": "id_categoria"} DE LA CONSOLA DEL POSTMAN O DESDE EL FRONT*********************/
/*3- BUSCAR EN LA BBDD TODOS LOS PRODUCTOS PERTENECIENTES AL {"id": "id_categoria"} INGRESADO AL POSTMAN****/
/*4- VERIFICAR SI EXISTEN PRODUCTOS EN LA BBDD PERTENECIENTES A LA CATEGORIA {"id": "id_categoria"}*********/
/*5- ENVIAR AL POSTMAN O AL FRONT UN JSON{}CON TODAS LOS PRODUCTOS DE LA CATEGORIA {categoria: req.body.id}*/
/***********************************http://URL/api/productos + GET******************************************/
/***********************************http://URL/api/productos/:id + [GET]************************************/
/***********************************************************************************************************/
exports.getAllProductosByCategoria = async(req, res) => {
/**EL USUARIO PUEDE INICIAR EL REQUEST [GET] INGRESANDO EL JSON {"id":"id_categoria"} A CONSOLA DE POSTMAN**/
/***O TAMBIEN PUEDE INICIAR EL REQUEST [GET] ADICIONANDO LA EXTENCION {/:id} EN LA URL**********************/
    try{
        /***{categoria: req.body.id} EL id DE LA categotia ES REQUERIDO DESDE LA CONSOLA DEL POSTMAN********/
        const allProductosByCategoria = await Producto.find({categoria: req.body.id});/*id DE LA CATEGORIA**/
        if(allProductosByCategoria==""){/*SI NO ENCUENTRA PRODUCTOS CON EL {id} DE LA CATEGORIA=> ENTONCES**/
            return res.status(404).json({msg: "WARNING: No se encontro ningun producto relacionado a la categoria"});
        }
        res.json(allProductosByCategoria);//IMPRIMIR EN POSTMAN TODOS LOS PRODUCTOS DE LA CATEGORIA id REQUERIDA EN EL POSTMAN
    }catch(error){/**SI EL {"id":"id_categoria"} INGRESADO EN POSTMAN, NO CUMPLE LOS CRITERIOS => CATCH ERROR*/
        res.status(404).json({msg: "WARNING: Error_ID: Id_Categoria no valido"});
    }/************************************FIN PETICION GET BY CATEGORIA*************************************/
};/*********************************************************************************************************/


/*********************************PETICION: PUT/UPDATE BY URL /:id******************************************/
/***********************exports.updateProducto => SE ENCARGA DE:********************************************/
/*1- EL USUARIO DEBE INGRESAR LA EXT_URL CON EL {"/id"} DEL PRODUCTO QUE DESEA ACTUALIZAR*******************/
/*2- EL USUARIO DEBE INICIAR EL REQUEST PUT ENVIANDO UN JSON EN POSTMAN, SETEANDO TODOS LOS CAMPOS DEL PRODUCTO QUE DESEA ACTUALIZAR*/
/*3- REQUERIR EL PARAMETRO "/:id" DE LA EXTENSION {"/id"} ADICIONADA A LA URL*******************************/
/*4- BUSCAR findById(id) EN LA BBDD, SI EXISTE UN PRODUCTO PERTENECIENTE AL {"/id"}*************************/
/*5- VERIFICAR SI EXISTE ALGUN PRODUCTO EN LA BBDD PERTENECIENTES AL {"id"} INGRESADO EN LA URL*************/
/*6- ENVIAR UN JSON EN POSTMAN SETEANDO LOS CAMPOS DEL PRODUCTO QUE DESEA ACTUALIZAR************************/
/*7- GUARDAR LOS CAMBIOS EN LA BBDD QUE SE REALIZARON AL PRODUCTO, CON EL METODO SAVE()*********************/
/*6- ENVIAR AL POSTMAN O AL FRONT UN MENSAJE****************************************************************/
/***********************************http://URL/api/productos/:id + [PUT]************************************/
/***********************************************************************************************************/
exports.updateProducto = async(req, res) => {
/**EL USUARIO DEBE INICIAR EL REQUEST PUT INGRESANDO LA EXT_URL CON "/id" DEL PRODUCTO QUE DESEA ACTUALIZAR*/
/**Y TAMBIEN DEBE DILIGENCIAR EN POSTMAN UN JSON{} CON TODOS LOS CAMPOS DEL PRODUCTO QUE DESEA MODIFICAR****/
    const {id} = req.params;
    try{/****BUSCAR findById(id) EN LA BBDD, SI EXISTE UN PRODUCTO PERTENECIENTE AL {"/id"}*****************/
        const producto = await Producto.findById(id);/******************************************************/        
        if(!producto){/*SI NO HAY PRODUCTOS ENCONTRADOS CON EL {id} INGRESADO EN LA URL... ENTONCES..*******/
            return res.status(400).json({msg: "WARNING: El id no corresponde a una Producto almacenada en esta BBDD"});
        }/**EN CASO CONTRATIO*******************************************************************************/
        
        /**SETEAR LOS CAMPOS DEL PRODUCTO CON LA INFORMACION REQUERIDA DEL POSTMAN**************************/
        producto.nombre = req.body.nombre || producto.nombre;
        producto.descripcion = req.body.descripcion || producto.descripcion;
        producto.stock = req.body.stock || producto.stock;
        producto.precio = req.body.precio || producto.precio;
        producto.imagen = req.body.imagen || producto.imagen;
        producto.categoria = producto.categoria; 

        producto.save();/**GUARDAR LOS CAMBIOS EN LA BBDD**************************************************/
        res.json("Producto Modificado exitosamente")
    }catch(error){
        res.json("WARNING: Error_ID: id_Producto no valido");
    }/***************************FIN PETICION: PUT/UPDATE BY URL /:id***************************************/
};/*********************************************************************************************************/


/*********************************PETICION: DELETE BY URL /:id**********************************************/
/***********************exports.deleteProductoById_URL => SE ENCARGA DE:************************************/
/*1- EL USUARIO DEBE INICIAR EL REQUEST DELETE INGRESANDO LA EXT_URL CON EL {"/id"} DEL PRODUCTO QUE DESEA ELIMINAR*/
/*2- REQUERIR EL PARAMETRO "/:id" DE LA EXTENSION {"/id"} ADICIONADA A LA URL CON const {id} = req.params;**/
/*3- BUSCAR MEDIANTE findById({_id: id}) EN LA BBDD, SI EXISTE UN PRODUCTO PERTENECIENTE AL {"/id"}*********/
/*4- VERIFICAR SI EXISTE ALGUN PRODUCTO EN LA BBDD PERTENECIENTES AL {"id"} INGRESADO EN LA URL*************/
/*5- Producto.deleteOne=> ELIMINAR EL PRODUCTO IDENTIFICADO CON EL ID TRAIDO DE LA URL {_id: req.params.id}*/
/***********************************http://URL/api/productos/:id + [DELETE]*********************************/
/***********************************************************************************************************/
exports.deleteProductoById_URL = async(req, res) => {
/**EL USUARIO DEBE INICIAR EL REQUEST DELETE INGRESANDO LA EXT_URL CON "/id" DE PRODUCTO QUE DESEA ELIMINAR*/
    const {id} = req.params;/**REQUERIR EL PARAMETRO "/:id" DE LA EXTENSION {"/id"}*************************/
    try{/***************************************************************************************************/
        /****BUSCAR findById({_id: id}) EN LA BBDD, SI EXISTE UN PRODUCTO PERTENECIENTE AL {"/id"}**********/
        const productoEncontrado = await Producto.findById({_id: id});
        if(!productoEncontrado){/*SI EL productoEncontrado==NULL => ENTONCES: "No hay productos con ese id"*/
            return res.status(404).json({msg: "No se encontro ningun producto asociado al id_producto: "+id});
        }/*DE LO CONTRARIO=>ENTONCES PROCEDA A BORRAR EL productoEncontrado Producto.deleteOne({_id: id})***/
        await Producto.deleteOne({_id: id});/**BORRAR PRODUCTO BY ID****************************************/
        res.status(200).json({msg: "El producto "+productoEncontrado.nombre+" Fue borrado con exito"});/****/
    }catch(error){
        res.status(404).json({msg: "WARNING: Error_ID: id_Producto no valido"});
    }/***************************FIN PETICION: DELETE BY URL /:id*******************************************/        
};/*********************************************************************************************************/

