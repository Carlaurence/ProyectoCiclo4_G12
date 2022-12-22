/***********************************************************************************************************/
/***************************************CRUD - TABLA: CATEGORIA*********************************************/
/****************************ESTE MODULO CONTIENE EL CRUD GET, PUT, POST, DELET*****************************/
/***********************************************************************************************************/

const Categoria = require("../models/Tcategoria"); /*****IMPORTAR MODELO "Categoria" DE CARPETA /models*****/


/************************************PETICION: POST SAVE(CATEGORIA)*****************************************/
/*******************exports.crearCategoria => SE ENCARGA DE:************************************************/
/********1- VERIFICAR QUE LA CATEGORIA NO ESTE REPETIDA EN LA BBDD******************************************/
/********2- IMPLEMENTAR EL SERVICIO categoria.save() PARA CREAR UNA NEW CATEGORIA EN LA BBDD****************/
/***************************************http://URL/api/categorias/******************************************/
/***********************************************************************************************************/
exports.crearCategoria = async (req, res) => {
    const { nombre } = req.body;/*******req.body => TRAER DATO DEL CAMPO nombre: DESDE EL POSTMAN O FRONT*****/
    try {/******************TRY CATCH CADA VEZ QUE INTERACTUEMOS CON BASES DE DATOS**************************/
        let categoria = await Categoria.findOne({ nombre });/**VERIFICAR SI EL {nombre} YA EXISTE EN LA BBDD**/
        /********************CONDICION IF:******************************************************************/
        if (categoria) {/******SI LA CATEGORIA YA EXISTE => ENTONCES =>***************************************/
            return res.status(404).json({ msg: "WARNING: La Categoria ya existe" })
        }
        /****SI LA CATEGORIA NO EXISTE => ENTONCES => PROCEDA A LA SIGUIENTE INSTRUCCION =>*****************/
        categoria = new Categoria(req.body);/*req.body => TRAER DATOS DE NEW CATEGORIA DESDE EL POSTMAN/FRONT*/
        categoria.creador = req.usuario.id;/*SETEAR EL CAMPO creador: DE LA TABLA:Tcategoria CON EL ID DEL usuario GENERADO EN LA BBDD*/
        categoria.save();/*************CREAR NEW CATEGORIA EN LA BBDD CON METODO SAVE()*********************/
        res.status(200).json({ msg: "Categoria creada con exito!" });/*res.json=> RETORNA RESPUESTA AL POSTMAN O FRONT CON LA INFO DE LA NEW CATEGORIA*/
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No hay datos para crear Categoria" });/*RETORNA RESPUESTA AL POSTMAN/FRONT*/
    }
};/************************************FIN PETICION POST CATEGORIA******************************************/
/***********************************************************************************************************/


/***********************PETICION: GET [TODAS LAS CATEGORIAS]************************************************/
/***********************exports.getAllCategorias => SE ENCARGA DE:******************************************/
/***1- EL USUARIO SOLO TIENE QUE INGRESAR LA URL BASICA Y REQUERIR EL METODO GET****************************/
/***2- TODAS LAS CATEGORIAS EXISTENTES EN LA BBDD SERAN ENCONTRADAS MEDIANTE EL METODO Categoria.find();****/
/***2- EL METODO Categoria.find(); RETORNARA UN JSON CON TODAS LAS CATEGORIAS*******************************/
/***********************************http://URL/api/categorias + GET*****************************************/
/***********************************************************************************************************/
exports.getAllCategorias = async (req, res) => {
    try {
        const allCategorias = await Categoria.find();/**BUSCAR TODAS LAS CATEGORIAS DE LA TABLA Categoria***/
        if (allCategorias == "") {/******SI allCategorias RETORNA VACIA/NULL => ENTONCES =>*********************/
            /**************ENTONCES QUIERE DECIR QUE NO EXISTE NINGUNA CATEGORIA EN LA BBDD*********************/
            return res.status(400).json({ categoria: allCategorias });
        }/********PERO SI categoria RETORNA OBJETOS TIPO CATEGORIA => ENTONCES =>***************************/
        else {
            res.status(200).json({ categoria: allCategorias });/*ENVIA Al POSTMAN O AL FRONT UN JSON{} CON TODAS LAS CATEGORIAS EXISTENTES*/
        }
    } catch (error) {

    }
};/***************************FIN PETICION GET [TODAS LAS CATEGORIAS]***************************************/
/***********************************************************************************************************/


/**********************************PETICION: GET CATEGORIA BY idCategoria***********************************/
/***********************get Categoria by idCategoria => SE ENCARGA DE:**************************************/
/*1- EL USUARIO DEBE INGRESAR /:id de la Categoria que desea buscar EN LA URL*******************************/
/*2- LA LINEA DE COMANDO const {id} = req.params; -- LA USAMAMOS PARA TRAER EL ID DESDE LA URL**************/
/*3- USAMOSLA FUNCION Categoria.findById(id) PARA BUSCAR EN LA BBDD LA CATEGORIA MEDIANTE EL /:id INGRESADO EN LA URL******************************/
/*4- VERIFICAR SI EXISTE UNA CATEGORIA EN LA BBDD QUE RESPONDA AL id INGRESADO EN LA URL********************/
/*5- ENVIAR AL POSTMAN O AL FRONT UN JSON{}CON LA CATEGORIA ENCONTRAAD**************************************/
/***********************************http://URL/api/caetgoria/id + [GET]*************************************/
/***********************************************************************************************************/

exports.getCategoriasByidCategoria = async (req, res) => {
    /**EL USUARIO DEBE INICIAR EL REQUEST [GET] INGRESANDO EL ID-CATEGORIA EN LA URL DEL POSTMAN************/
    const { id } = req.params;/**PARA BUSCARLOS POR UN NOMBRE INGRESADO EN /URL*******************************/
    try {
        const categoria = await Categoria.findById(id);/* => RETORNA LA CATEGORIA ENCONTRADA, SOLO SI EXISTE*/
        /********************CONDICION IF:****************************************************************/
        if (!categoria) {/******SI categoria RETORNA VACIA/NULL => ENTONCES =>******************************/
            /**********ENTONCES QUIERE DECIR QUE EL USUARIO NO HA CREADO NINGUNA CATEGORIA****************/
            return res.status(400).json({ msg: "WARNING: Categoria no existe en la BBDD" });/***************/
        } else {/********PERO SI categoria RETORNA UN OBJETO TIPO CATEGORIA => ENTONCES =>******************/
            return res.status(200).json({ categoria: categoria });/*ENVIA A POSTMAN UN JSON{} CON LA CATEGORIA*/
        }

    } catch (error) {
        console.log(error);
    }
};/************************************FIN PETICION GET CATEGORIA BY idCategoria************************/
/***********************************************************************************************************/


/************************PETICION: GET ALL CATEGORIAS SIN LOGGEARSE AUTH-MIDDLEWARE*************************/
/*ESTA PETICION ES PARA PRINTEAR TODAS LAS CATEGORIAS EN EL HOME PARA QUE EL CLIENTE PUEDA VERLOS Y COMPRAR*/
/**LAS CATEGORIAS QUE SE MUESTRAN EN EL FRONT NO PUEDEN EJECUTAR OPCIONES DEL CRUD******************* ******/
/**ESTAS CATEGORIAS UNICAMENTE SON PARA QUE EL CLIENTE PUEDA HACER COMPRAS*************************** ******/
/***********************************http://URL/api/categorias/home/cliente**********************************/
exports.getCategoriasHome = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json({ categorias });
    } catch (error) {
        console.log(error);
    }
};/************************PETICION: GET ALL CATEGORIAS SIN LOGGEARSE AUTH-MIDDLEWARE***********************/



/*********************PETICION: GET [TODAS LAS CATEGORIAS] BY _ID DEL USUARIO_CREADOR***********************/
/******exports.getCategoriasByCreador => SE ENCARGA DE:*****************************************************/
/******1- ENCONTRAR TODAS LAS CATEGORIAS EXISTENTES EN LA BBDD BY _ID DEL USUARIO QUE LAS CREO**************/
/******2- ENVIAR AL POSTMAN O AL FRONT UN JSON{} CON TODAS LAS CATEGORIAS CREADAS X EL USUARIO AUTENTICADO**/
/***************************************http://URL/api/categorias*******************************************/
/***********************************************************************************************************/
//  exports.getCategoriasByCreador = async(req, res) => {
//      try{
//          /***Categoria.find=> ENCUENTRA TODAS LAS CATEGORIAS CREADAS X EL USUARIO QUE SE LOGEO Y ...........*  
//           *AUTENTICO SU INGRESO A LA PETICION, MEDIANTE SU TOKEN********************************************/
//          const categoria = await Categoria.find({creador: req.usuario.id});/*CATEGORIAS QUE EL USUARIO CREO**/
//          /********************CONDICION IF:******************************************************************/
//          if(categoria==""){/******SI categoria RETORNA VACIA/NULL => ENTONCES =>*****************************/
//              /**********ENTONCES QUIERE DECIR QUE EL USUARIO NO HA CREADO NINGUNA CATEGORIA******************/
//              return res.status(400).json({msg: "WARNING: Este usuario no ha creado ninguna categoria"});
//          }/********PERO SI categoria RETORNA OBJETOS TIPO CATEGORIA => ENTONCES =>***************************/
//          //res.json(categoria);/*ENVIA A POSTMAN O AL FRONT UN JSON{} CON LAS CATEGORIAS CREADAS X ESE USUARIO*/
//          res.status(200).json({categoria: categoria});
//         }catch(error){
//          console.log(error);
//      }

//  };/************************************FIN PETICION GET [TODAS LAS CATEGORIAS] BY _ID DEL USUARIO_CREADOR******************/
/***********************************************************************************************************/


/**********************************PETICION: GET CATEGORIA BY NOMBRE-CATEGORIA******************************/
/***********************getAllProductosByNombre => SE ENCARGA DE:*******************************************/
/*1- EL USUARIO DEBE INGRESAR UN JSON {"nombre": "nombre-categoria"} EN CONSOLA DEL POSTMAN*****************/
/*2- REQUERIR EL JSON {"nombre": "nombre"} DE LA CONSOLA DEL POSTMAN O DESDE EL FRONT***********************/
/*3- BUSCAR EN LA BBDD LA CATEGORIA MEDIANTE EL NOMBRE {"nombre": "nombre"} INGRESADO AL POSTMAN************/
/*4- VERIFICAR SI EXISTE UNA CATEGORIA EN LA BBDD QUE RESPONDA AL NOMBRE {"nombre": "nombre"}***************/
/*5- ENVIAR AL POSTMAN O AL FRONT UN JSON{}CON LA CATEGORIA ENCONTRAAD**************************************/
/***********************************http://URL/api/caetgoria/NOMBRECATEGORIA + [GET]************************************/
/***********************************************************************************************************/

// exports.getCategoriasByNombre = async(req, res) => {
//     /**EL USUARIO DEBE INICIAR EL REQUEST [GET] INGRESANDO EL JSON {"nombre":"nombre"} A CONSOLA DE POSTMAN**/
//     /**EL USUARIO DEBE INICIAR EL REQUEST [GET] INGRESANDO EL NOMBRE-CATEGORIA EN LA URL DEL POSTMAN*********/
//     //const {nombre} = req.body;/**PARA BUSCARLO POR UN JSON{} INGRESADO EN CONSOLA***/
//     const {nombre} = req.params;/**PARA BUSCARLOS POR UN NOMBRE INGRESADO EN /URL***/
//     console.log(nombre);
//     try{
//         /***Categoria.find=> ENCUENTRA TODAS LAS CATEGORIAS CREADAS X EL USUARIO QUE SE LOGEO Y ...........*  
//          *AUTENTICO SU INGRESO A LA PETICION, MEDIANTE SU TOKEN********************************************/
//         const categoria = await Categoria.findOne({nombre: nombre});/*CATEGORIAS QUE EL USUARIO CREO**/
//         /********************CONDICION IF:******************************************************************/
//         if(!categoria){/******SI categoria RETORNA VACIA/NULL => ENTONCES =>*****************************/
//             /**********E
//              * 
//              * NTONCES QUIERE DECIR QUE EL USUARIO NO HA CREADO NINGUNA CATEGORIA******************/
//             return res.status(400).json({msg: "WARNING: Categoria no existe en la BBDD"});
//         }/********PERO SI categoria RETORNA OBJETOS TIPO CATEGORIA => ENTONCES =>***************************/
//         res.json(categoria);/*ENVIA A POSTMAN O AL FRONT UN JSON{} CON LAS CATEGORIAS CREADAS X ESE USUARIO*/
//     }catch(error){
//         console.log(error);
//     }
// };/************************************FIN PETICION GET CATEGORIA BY NOMBRE-CATEGORIA************************/
/***********************************************************************************************************/


/*********************************PETICION: PUT/UPDATE BY URL /:id******************************************/
/***********************exports.updateCategoria => SE ENCARGA DE:*******************************************/
/***********************1- TRAER EL PARAMETRO ID QUE VIENE DEL FINAL DE LA URL {"/id"}**********************/
/***********************2- BUSCAR findById() UNA CATEGORIA MEDIANTE EL {"/id"}******************************/
/***********3- COMPARAR SI EL {"/id"} DEL USUARIO_CREADOR DE LA CATEGORIA ES !== DEL ID DE LA URL {"/id"}***/
/***********4- SETEAR EL CAMPO categoria.nombre CON LA INFORMACION TRAIDA DESDE EL POSTMAN******************/
/***********************5- ACTUALIZAR CATEGORIA EN LA BBDD CON METODO SAVE(CATEGORIA)***********************/
/***********************6- ENVIAR AL POSTMAN O AL FRONT UN JSON{} CON LA CATEGORIA ACTUALIZADA**************/
/***********************************http://URL/api/categorias/:id***********************************************/
/***********************************************************************************************************/
exports.updateCategoria = async (req, res) => {

    try {
        const { id } = req.params;/*REQUIERE EL PARAMETRO {id} QUE VIENE DEL FINAL DE LA URL "/id"************/
        const categoria = await Categoria.findById(id);/*CONSULTA SI HAY UNA CATEGORIA EN LA BBDD IDENTIFICADA CON EL ID QUE INGRESA EL USUARIO DESDE EL FRONT O POSTMAN*/
        const categoriaByNombre = await Categoria.findOne({ nombre: req.body.nombre });/**AQUI VAMOS A BUSCAR SI EL NOMBRE QUE SE INGRESA EN EL BODY DE POSTMAN / O EN LAS CAJA DE TEXTO DEL FRONT DE LA PAG WEB, YA EXISTE EN LA BBDD*/
        if (!categoria) {/******SI categoria RETORNA VACIA/NULL => ENTONCES => "Categoria no encontrada"******/
            return res.status(404).json({ msg: "No se encontro ninguna Categoria asociada al id ingresado" });
        }/***PERO SI categoria RETORNA UN OBJETO, => ENTONCES => CONTINUA LA EJECUCION**********************/
        //SI EL {id} DEL USUARIO_CREADOR DE LA CATEGORIA REGISTRADO EN LA BBDD, ES !== AL {id} DEL USUARIO QUE SE LOGEO EN EL POSTMAN / FRONT =>  

        /******CONDICION IF: PARA QUE UN USUARIO NO PUEDA MODIFICAR UNA CATEGORIA QUE NO FUE CREADA POR EL**/
        else if (categoria.creador.toString() !== req.usuario.id.toString()) {/*SI EL {ID} DEL USUARIO_CREADOR DE*** 
            LA CATEGORIA ES !== AL {ID} INGRESADO MEDIANTE LA URL "/id", ENTONCES ESA ACCION ES NO VALIDA***/
            return res.status(404).json({ msg: "Accion no valida para este usuario" });
        }/***PERO SI AMBOS ID'S SON IGUALES, => ENTONCES => PERMITASE CONTINUA LA EJECUCION*******************/

        else if (categoriaByNombre) {/**SI categoriaByNombre RETORNA CON CONTENIDO (NOT NULL), ES PORQUE EL 
                                        **NOMBRE QUE EL USUARIO DESEA ACTUALIZAR, YA EXISTE EN LA BASE DE DATOS 
                                        Y NO PODEMOS PERMITIR QUE SE REPITA***********************************/
            return res.status(404).json({ msg: "ACCION NO VALIDA: El nombre de la Categoria ya existe en la BBDD" });
        }

        /**SI PASA TODAS LAS CONDICIONES => ENTONCES *******************************************************/
        /**EL CAMPO categoria.nombre SERA ACTUALIZADO CON req.body.nombre INGRESADO EN POSTMAN || **********/
        /**EL CAMPO categoria.nombre CONSERVARA SU INFORMACION ORIGINAL categoria.nombre********************/
        else {
            categoria.nombre = req.body.nombre || categoria.nombre;
            categoria.save();/*************ACTUALIZAR CATEGORIA EN LA BBDD CON METODO SAVE()********************/
            return res.status(200).json({ msg: "La Categoria Fue Actualizada con exito" });/*****ENVIAR AL POSTMAN O AL FRONT UN JSON{} CON LA CATEGORIA ACTUALIZADA*****/
        }
    } catch (error) {
        console.log("ERROR: El {id} es invalido");
        res.json({ msg: "ERROR: El {id} es invalido" });
    }
};/***************************FIN PETICION: PUT/UPDATE SAVE(CATEGORIA)**************************************/
/***********************************************************************************************************/



/*********************************PETICION: DELETE BY URL /:id**********************************************/
/***********************exports.deleteCategoriaById_URL => SE ENCARGA DE:***********************************/
/***********************1- TRAER EL PARAMETRO ID QUE VIENE DEL FINAL DE LA URL {"/id"}**********************/
/***********************2- ELIMINAR LA CATEGORIA EN LA BBDD MEDIANTE EL {/:id} CON METODO DELETEONE(ID)*****/
/***********************3- ENVIAR AL POSTMAN O AL FRONT UN MENSAJE "Categoria eliminada"********************/
/***********************************http://URL/api/categorias/:id*******************************************/
/***********************************************************************************************************/
exports.deleteCategoriaById_URL = async (req, res) => {
    /**EL USUARIO DEBE INICIAR EL REQUEST DELETE INGRESANDO LA EXT_URL CON "/id" DE CATEGORY QUE DESEA ELIMINAR*/
    const { id } = req.params;/**REQUERIR EL PARAMETRO "/:id" DE LA EXTENSION {"/id"}*************************/
    try {/***************************************************************************************************/
        /****BUSCAR findById({_id: id}) EN LA BBDD, SI EXISTE UNA CATEGORIA PERTENECIENTE AL {"/id"}********/
        const categoriaEncontrada = await Categoria.findById({ _id: id });

        if (!categoriaEncontrada) {/*SI LA categoriaEncontrada==NULL => ENTONCES: "No hay Categoria con ese id"*/
            return res.status(404).json({ msg: "No se encontro ninguna Categoria asociada al id ingresado" });
        }/*SI categoriaEncontrada=TRUE => PROCEDA A COMPROBAR QUE EL USUARIO SEA EL CREADOR DE LA CATEGORIA*/

        /******CONDICION IF: PARA QUE UN USUARIO NO PUEDA BORRAR UNA CATEGORIA QUE FUE CREADA POR OTRO******/
        else if (categoriaEncontrada.creador.toString() !== req.usuario.id.toString()) {/*SI EL {ID} DEL USUARIO_CREADOR DE*** 
            LA CATEGORIA ES !== AL {ID} INGRESADO MEDIANTE LA URL "/id", ENTONCES ESA ACCION ES NO VALIDA***/
            return res.status(404).json({ msg: "Accion no valida para este usuario" });
        }/***PERO SI AMBOS ID'S SON IGUALES, => ENTONCES => CONTINUA LA EJECUCION***************************/
        else {
            /*DE LO CONTRARIO=>ENTONCES PROCEDA A BORRAR LA categoriaEncontrada Categoria.deleteOne({_id: id})**/
            await Categoria.deleteOne({ _id: id });/**BORRAR CATEGORIA BY ID**************************************/
            return res.status(200).json({ msg: "La Categoria Fue borrada con exito" });/***/
        }

    } catch (error) {
        res.status(404).json({ msg: "WARNING: Error_ID: id_Categoria no valido" });
    }/***************************FIN PETICION: DELETE BY URL /:id*******************************************/
};/***************************FIN PETICION: DELETE**********************************************************/
/***********************************************************************************************************/



/*********************************PETICION: DELETE BY JSON{_id:" "}*****************************************/
/***********************exports.exports.deleteCategoriaByJson => SE ENCARGA DE:*****************************/
/***********************1- TRAER EL PARAMETRO JSON{"id": ""} DEL BODY DEL POSTMAN***************************/
/***********************2- ELIMINAR LA CATEGORIA EN LA BBDD PASANDO {json_id} AL METODO DELETEONE(json_id)**/
/***********************3- ENVIAR AL POSTMAN O AL FRONT UN MENSAJE "Categoria eliminada"********************/
/***********************************http://URL/api/categorias/**********************************************/
/***********************************************************************************************************/
/*
exports.deleteCategoriaByJson = async(req, res) => {
    try{
        const {json_id} = req.body;
        if(json_id){
            console.log("PAILA,. ESE ID NO EXISTE");
        }
        await Categoria.deleteOne(json_id);
        res.json({msg: "Categoria eliminada"});
    }catch(error){
        console.log("ERROR: El {id} es invalido \n" + error);
        res.json({msg: "ERROR: El {id} es invalido"});
    }
};*/
/***************************FIN PETICION: DELETE BY JSON{_id:" "}*****************************************/
/***********************************************************************************************************/