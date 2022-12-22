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
    /*EL USUARIO DEBE INICIAR EL REQUEST POST AL POSTMAN - INGRESANDO EL JSON: 
    {
        "nombre":"",
        "descripcion":"",
        "stock":"",
        "precio":"",
        "imagen":"",
        "categoriaId":""
    } *****/
    const {nombre} = req.body;/*******req.body => TRAER DATO DEL CAMPO {nombre}: DESDE EL POSTMAN***********/

    try{
        const productoExiste = await Producto.findOne({nombre: nombre});/**BUSCAMOS EN LA BBDD SI EL NOMBRE QUE SE QUIERE CREAR YA EXISTE*/
        if(productoExiste){/**SI EL NOMBRE DEL PRODUCTO YA EXISTE EN LA BBDD => NO CREARLO************************/
            return res.status(404).json({msg: "ACCION NO VALIDA: El Producto ya existe en la BBDD"});/******/
        }else{/**PERO SI NOMBRE-PRODUCTO NO EXISTE => CREARLO EN LA BBDD************************************/
            const nuevoProducto = new Producto(req.body);/*req.body =>TRAER DATOS DESDE POSTMAN/FRONT Y CREAR NEW PRODUCTO*/
            nuevoProducto.save();/*CREAR NEW PRODUCTO EN LA BBDD    CON METODO SAVE()*******************************/
            return res.status(200).json({msg: "El producto fue creado exitosamente"});/*res.json=> RETORNA RESPUESTA AL POSTMAN O FRONT CON LA INFO DEL PROD*/    
        }   
    }catch(error){/**SI NO SE DILIGENCIAN TODOS LOS CAMPOS OBLIGATORIOS => CATCH ERROR**********************/
        res.json({error});/*RETORNA RESPUESTA AL POSTMAN/FRONT*/
        //console.log(error);
    }/***********************************FIN METODO POST - CREAR NEW PRODUCTO********************************/
}/**********************************************************************************************************/


/***********************PETICION: GET [TODOS LOS PRODUCTOS] ************************************************/
/***********************getAllProductos => SE ENCARGA DE:***************************************************/
/*1- EL USUARIO SOLO DEBE INGRESAR LA URL DEL POSTMAN http://URL/api/productos *****************************/
/*2- REQUERIR EL JSON {"id": "id_categoria"} DE LA CONSOLA DEL POSTMAN O DESDE EL FRONT*********************/
/*3- BUSCAR EN LA BBDD TODOS LOS PRODUCTOS PERTENECIENTES AL {"id": "id_categoria"} INGRESADO AL POSTMAN****/
/*4- VERIFICAR SI EXISTEN PRODUCTOS EN LA BBDD PERTENECIENTES A LA CATEGORIA {"id": "id_categoria"}*********/
/*5- ENVIAR AL POSTMAN O AL FRONT UN JSON{}CON TODAS LOS PRODUCTOS DE LA CATEGORIA {categoria: req.body.id}*/
/***********************************http://URL/api/productos + GET******************************************/
/***********************************http://URL/api/productos + [GET]************************************/
/***********************************************************************************************************/
exports.getAllProductos = async(req, res) => {
/**EL USUARIO PUEDE INICIAR EL REQUEST [GET] INGRESANDO EL JSON {"id":"id_categoria"} A CONSOLA DE POSTMAN**/
/***O TAMBIEN PUEDE INICIAR EL REQUEST [GET] ADICIONANDO LA EXTENCION {/:id} EN LA URL**********************/
    try{
        /***{categoria: req.body.id} EL id DE LA categotia ES REQUERIDO DESDE LA CONSOLA DEL POSTMAN********/
        const getAllProductos = await Producto.find();/*GET TODOS LOS PRODUCTOS EXISTENTES******************/
        if(!getAllProductos){/*SI RETORNA FALSO => ENTONCES NO HAY PRODUCTOS REGISTRADOS EN LA BBDD*********/
            return res.status(400).json({producto: getAllProductos});
        }else{
            return res.status(200).json({producto: getAllProductos});/*ENVIA Al POSTMAN O AL FRONT UN JSON{} CON TODOS LOS PRODUCTOS EXISTENTES*/
        }
    }catch(error){/****/
        res.json(error);
    }/************************************FIN PETICION GET ALL*********************************************/
}/*********************************************************************************************************/


/**********************************PETICION: GET PRODUCTO BY idProducto***********************************/
/***********************getProductoById  => SE ENCARGA DE:***************************************************/
/*1- EL USUARIO DEBE INGRESAR /:id de la idProducto que desea buscar EN LA URL*******************************/
/*2- LA LINEA DE COMANDO const {id} = req.params; -- LA USAMAMOS PARA TRAER EL ID DESDE LA URL**************/
/*3- USAMOSLA FUNCION Producto.findById(id) PARA BUSCAR EN LA BBDD EL PRODUCTO MEDIANTE EL /:id INGRESADO EN LA URL******************************/
/*4- VERIFICAR SI EXISTE UN PRODUCTO EN LA BBDD QUE RESPONDA AL id INGRESADO EN LA URL********************/
/*5- ENVIAR AL POSTMAN O AL FRONT UN JSON{}CON EL PRODUCTO ENCONTRAAD**************************************/
/***********************************http://URL/api/productos/id + [GET]*************************************/
/***********************************************************************************************************/

exports.getProductoById = async(req, res) => {
    /**EL USUARIO DEBE INICIAR EL REQUEST [GET] INGRESANDO EL ID-PRODUCTO EN LA URL DEL POSTMAN************/
    const {id} = req.params;/**REQUERIMOS EL ID DE /URL PARA BUSCARLO EN LA BBDD***************************/
      try{
          const producto = await Producto.findById(id);/* => RETORNA EL PRODUCTO ENCONTRADA, SOLO SI EXISTE*/
          /********************CONDICION IF:****************************************************************/
          if(!producto){/******SI producto RETORNA VACIA/NULL => ENTONCES =>******************************/
              /**********ENTONCES QUIERE DECIR QUE NO HAY CATEGORIAS EN LA BDD CON ESE ID*******************/
              return res.status(400).json({msg: "WARNING: El Producto no existe en la BBDD"});/************/
          }else{/********PERO SI producto RETORNA UN OBJETO  => ENTONCES =>********************************/
             return res.status(200).json({producto: producto});/*ENVIA A POSTMAN UN JSON{} CON EL PRODUCTO*/
         }
      }catch(error){
          console.log(error);
      }
};/************************************FIN PETICION GET producto BY id**************************************/
/***********************************************************************************************************/



/***********************PETICION: GET [CONJUNTO DE PRODUCTOS] BY ID-CATEGORIA*******************************/
/***********************getAllProductosByCategoria => SE ENCARGA DE:****************************************/
/*1- EL USUARIO DEBE INGRESAR LA PETICION GET CON LA URL /api/productos/bycategoria/:id*********************/
/*2- REQUERIR EL /:id DE LA URL MEDIANTE EL METODO req.params***********************************************/
/*3- CON EL idCategoria, DEBEMOS HACER LA BUSQUEDA EN LA BBDD DE TODOS LOS PRODUCTOS PERTENECIENTES AL ESA CATEGORIA****/
/*4- LA BUSQUEDA SE DEBE REALIZAR CON EL METODO Producto.find(PARAMETRO)************************************/
/*5- EL PARAMETRO SE PUEDE INGRESAR DE DOS FORMAS: */
/*4- VERIFICAR SI EXISTEN PRODUCTOS EN LA BBDD PERTENECIENTES A LA CATEGORIA {"id": "id_categoria"}*********/
/*5- ENVIAR AL POSTMAN O AL FRONT UN JSON{}CON TODAS LOS PRODUCTOS DE LA CATEGORIA {categoria: req.body.id}*/
/**************************http://URL/api/productos/bycategoria/:id  + [GET]***********************/
/***********************************************************************************************************/
exports.getAllProductosByCategoria = async(req, res) => {
/**EL USUARIO DEBE INICIAR EL REQUEST [GET] INGRESANDO LA URL /api/productos/bycategoria/:id****************/
    /***const {id} req.params; EL /:id DE LA CATEGORIA ES REQUERIDO DESDE LA URL MEDIANTE req.params********/    
    try{
        const allProductosByCategoria = await Producto.find({categoriaId: req.params.id});/*id DE LA CATEGORIA**/
        /**OTRA FORMA DE OBTENER allProductosByCategoria
         * const {id} = req.params;
         * const allProductosByCategoria = await Producto.find().where("categoriaId").equal(id)**/

        if(!allProductosByCategoria){/*SI NO ENCUENTRA PRODUCTOS CON EL {id} DE LA CATEGORIA=> ENTONCES**/
            return res.status(404).json({productos: allProductosByCategoria});//RETORNE UN JSON VACIO
        }else{
            return res.status(200).json({productos: allProductosByCategoria});//RETORNE UN JSON CON LOS PRODUCTOS 
        }
        
    }catch(error){/**SI EL {"id":"id_categoria"} INGRESADO EN POSTMAN, NO CUMPLE LOS CRITERIOS => CATCH ERROR*/
        res.status(404).json({msg: "WARNING: Error_ID: Id_Categoria no valido"});
    }/************************************FIN PETICION GET BY ID_CATEGORIA*************************************/
}/*********************************************************************************************************/

/*************************PETICION: GET ALL PRODUCTOS SIN LOGGEARSE AUTH-MIDDLEWARE*************************/
/**ESTA PETICION ES PARA PRINTEAR TODAS LOS PRODUCTOS EN EL HOME PARA QUE EL CLIENTE PUEDA VERLOS Y COMPRAR*/
/**LOS PRODUCTOS QUE SE MUESTRAN EN EL FRONT NO PUEDEN EJECUTAR OPCIONES DEL CRUD***************************/
/**ESTOS PRODUCTOS UNICAMENTE SON PARA QUE EL CLIENTE PUEDA HACER COMPRAS***********************************/
/*****************************************http://URL/api/productos/home/cliente*****************************/
exports.getProductoHome = async (req, res) => {
    try {
        const productos = await Producto.find();
        /**IMPORTANTE: EL NOMBRE DE LA CONSTANTE productos DEBE COINCIDIR CON EL NOMBRE DEL useState EN EL FRONT */
        res.json({ productos });
    } catch (error) {
        console.log(error);
    }
};

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
    
    try{
        const {id} = req.params;
        /****BUSCAR findById(id) EN LA BBDD, SI EXISTE UN PRODUCTO PERTENECIENTE AL {"/id"}*****************/
        const producto = await Producto.findById(id);/******************************************************/        
        console.log(producto);
        if(!producto){/*SI NO HAY PRODUCTOS ENCONTRADOS CON EL {id} INGRESADO EN LA URL... ENTONCES..*******/
            return res.status(400).json({msg: "WARNING: El id no corresponde a una Producto almacenada en esta BBDD"});
        }/**EN CASO CONTRATIO*******************************************************************************/
        else{
        /**SETEAR LOS CAMPOS DEL PRODUCTO CON LA INFORMACION REQUERIDA DEL POSTMAN**************************/
            producto.nombre = req.body.nombre || producto.nombre;
            producto.descripcion = req.body.descripcion || producto.descripcion;
            producto.stock = req.body.stock || producto.stock;
            producto.precio = req.body.precio || producto.precio;
            producto.imagen = req.body.imagen || producto.imagen;
            producto.categoriaId = producto.categoriaId;/*SIGNIFICA QUE NO PUEDE SER MODIFICADO DESDE EL FRONT*/

            producto.save();/**GUARDAR LOS CAMBIOS EN LA BBDD**************************************************/
            res.json({msg: "Producto Modificado exitosamente"})
            console.log(producto);
        }

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
            return res.status(404).json({msg: "No se encontro ningun producto asociado al id_producto"});
        }/*DE LO CONTRARIO=>ENTONCES PROCEDA A BORRAR EL productoEncontrado Producto.deleteOne({_id: id})***/
        await Producto.deleteOne({_id: id});/**BORRAR PRODUCTO BY ID****************************************/
        res.status(200).json({msg: "El producto Fue borrado"});/****/
    }catch(error){
        res.status(404).json({msg: "WARNING: Error_ID: id_Producto no valido"});
    }/***************************FIN PETICION: DELETE BY URL /:id*******************************************/        
};/*********************************************************************************************************/

