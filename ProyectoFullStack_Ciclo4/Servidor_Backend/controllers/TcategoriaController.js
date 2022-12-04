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
exports.crearCategoria = async(req, res) => {
    const {nombre} = req.body;/*******req.body => TRAER DATO DEL CAMPO nombre: DESDE EL POSTMAN O FRONT*****/
    try{/******************TRY CATCH CADA VEZ QUE INTERACTUEMOS CON BASES DE DATOS**************************/
        let categoria = await Categoria.findOne({nombre});/**VERIFICAR SI EL {nombre} YA EXISTE EN LA BBDD**/
        /********************CONDICION IF:******************************************************************/
        if(categoria){/******SI LA CATEGORIA YA EXISTE => ENTONCES =>***************************************/
            return res.status(404).json({msg: "WARNING: La Categoria ya existe"})
        }
        /****SI LA CATEGORIA NO EXISTE => ENTONCES => PROCEDA A LA SIGUIENTE INSTRUCCION =>*****************/
        categoria = new Categoria(req.body);/*req.body => TRAER DATOS DE NEW CATEGORIA DESDE EL POSTMAN/FRONT*/        
        categoria.creador = req.usuario.id;/*SETEAR EL CAMPO creador: DE LA TABLA:Tcategoria CON EL ID DEL usuario GENERADO EN LA BBDD*/
        categoria.save();/*************CREAR NEW CATEGORIA EN LA BBDD CON METODO SAVE()*********************/
        res.json(categoria);/*res.json=> RETORNA RESPUESTA AL POSTMAN O FRONT CON LA INFO DE LA NEW CATEGORIA*/
    }catch(error){
        console.log(error);
        res.status(404).json({msg: "No hay datos para crear Categoria"});/*RETORNA RESPUESTA AL POSTMAN/FRONT*/
    }
};/************************************FIN PETICION POST CATEGORIA******************************************/
/***********************************************************************************************************/


/*********************PETICION: GET [TODAS LAS CATEGORIAS] BY _ID DEL USUARIO_CREADOR***********************/
/******exports.getCategoriasByCreador => SE ENCARGA DE:*****************************************************/
/******1- ENCONTRAR TODAS LAS CATEGORIAS EXISTENTES EN LA BBDD BY _ID DEL USUARIO QUE LAS CREO**************/
/******2- ENVIAR AL POSTMAN O AL FRONT UN JSON{} CON TODAS LAS CATEGORIAS CREADAS X EL USUARIO AUTENTICADO**/
/***************************************http://URL/api/categorias*******************************************/
/***********************************************************************************************************/
exports.getCategoriasByCreador = async(req, res) => {
    try{
        /***Categoria.find=> ENCUENTRA TODAS LAS CATEGORIAS CREADAS X EL USUARIO QUE SE LOGEO Y ...........*  
         *AUTENTICO SU INGRESO A LA PETICION, MEDIANTE SU TOKEN********************************************/
        const categoria = await Categoria.find({creador: req.usuario.id});/*CATEGORIAS QUE EL USUARIO CREO**/
        /********************CONDICION IF:******************************************************************/
        if(categoria==""){/******SI categoria RETORNA VACIA/NULL => ENTONCES =>*****************************/
            /**********ENTONCES QUIERE DECIR QUE EL USUARIO NO HA CREADO NINGUNA CATEGORIA******************/
            return res.status(400).json({msg: "WARNING: Este usuario no ha creado ninguna categoria"});
        }/********PERO SI categoria RETORNA OBJETOS TIPO CATEGORIA => ENTONCES =>***************************/
        res.json(categoria);/*ENVIA A POSTMAN O AL FRONT UN JSON{} CON LAS CATEGORIAS CREADAS X ESE USUARIO*/
    }catch(error){
        console.log(error);
    }
};/************************************FIN PETICION GET CATEGORIA BY USUARIO_CREADOR************************/
/***********************************************************************************************************/


/***********************PETICION: GET [TODAS LAS CATEGORIAS]************************************************/
/***********************exports.getAllCategorias => SE ENCARGA DE:******************************************/
/***********************1- ENCONTRAR TODAS LAS CATEGORIAS EXISTENTES EN LA BBDD*****************************/
/***********************2- ENVIAR AL POSTMAN O AL FRONT UN JSON{} CON TODAS LAS CATEGORIAS******************/
/***********************************http://URL/api/categorias/all*******************************************/
/***********************************************************************************************************/
exports.getAllCategorias = async(req, res) => {
    try{
        const allCategorias = await Categoria.find();/**BUSCAR TODAS LAS CATEGORIAS DE LA TABLA Categoria***/
        if(allCategorias==""){/******SI allCategorias RETORNA VACIA/NULL => ENTONCES =>*********************/
        /**************ENTONCES QUIERE DECIR QUE NO EXISTE NINGUNA CATEGORIA EN LA BBDD*********************/
        return res.status(400).json({msg: "WARNING: No hay categorias existentes en la BBDD"});
        }/********PERO SI categoria RETORNA OBJETOS TIPO CATEGORIA => ENTONCES =>***************************/
        res.json(allCategorias);/*ENVIA Al POSTMAN O AL FRONT UN JSON{} CON TODAS LAS CATEGORIAS EXISTENTES*/  
    }catch(error){
        
    }
};/***************************FIN PETICION GET [TODAS LAS CATEGORIAS]***************************************/
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
exports.updateCategoria = async(req, res) => {
    try{
        const {id} = req.params;/*REQUIERE EL PARAMETRO {id} QUE VIENE DEL FINAL DE LA URL "/id"************/
        const categoria = await Categoria.findById(id);/*CONSULATA UNA CATEGORIA EN LA BBDD MEDIANTE el {id}*/
        if(!categoria){/******SI categoria RETORNA VACIA/NULL => ENTONCES => "Categoria no encontrada"******/
            return res.status(400).json({msg: "WARNING: El id no corresponde a una Categoria almacenada en esta BBDD"});
        }/***PERO SI categoria RETORNA UN OBJETO, => ENTONCES => CONTINUA LA EJECUCION**********************/
        //SI EL {id} DEL USUARIO_CREADOR DE LA CATEGORIA proveniente de la BBDD es !== al {id} del usuario que desea realizar la actualizacion de la categoria =>  
        
        /******CONDICION IF: PARA QUE UN USUARIO NO PUEDA MODIFICAR UNA CATEGORIA QUE NO FUE CREADA POR EL**/
        if(categoria.creador.toString() !== req.usuario.id.toString()){/*SI EL {ID} DEL USUARIO_CREADOR DE*** 
            LA CATEGORIA ES !== AL {ID} INGRESADO MEDIANTE LA URL "/id", ENTONCES ESA ACCION ES NO VALIDA***/
            return res.status(404).json({msg: "Accion no valida para este usuario"});
        }/***PERO SI AMBOS ID'S SON IGUALES, => ENTONCES => CONTINUA LA EJECUCION***************************/

        /**EL CAMPO categoria.nombre SERA ACTUALIZADO CON req.body.nombre INGRESADO EN POSTMAN || **********/
        /**EL CAMPO categoria.nombre CONSERVARA SU INFORMACION ORIGINAL categoria.nombre********************/
        categoria.nombre = req.body.nombre || categoria.nombre;
        categoria.save();/*************ACTUALIZAR CATEGORIA EN LA BBDD CON METODO SAVE()********************/
        res.json({categoria});/*****ENVIAR AL POSTMAN O AL FRONT UN JSON{} CON LA CATEGORIA ACTUALIZADA*****/
    }catch(error){
        console.log("ERROR: El {id} es invalido \n" + error);
        res.json({msg: "ERROR: El {id} es invalido"});
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
exports.deleteCategoriaById_URL = async(req, res) => {
    /**EL USUARIO DEBE INICIAR EL REQUEST DELETE INGRESANDO LA EXT_URL CON "/id" DE CATEGORY QUE DESEA ELIMINAR*/
    const {id} = req.params;/**REQUERIR EL PARAMETRO "/:id" DE LA EXTENSION {"/id"}*************************/
    try{/***************************************************************************************************/
        /****BUSCAR findById({_id: id}) EN LA BBDD, SI EXISTE UNA CATEGORIA PERTENECIENTE AL {"/id"}********/
        const categoriaEncontrada = await Categoria.findById({_id: id});
        if(!categoriaEncontrada){/*SI LA categoriaEncontrada==NULL => ENTONCES: "No hay Categoria con ese id"*/
            return res.status(404).json({msg: "No se encontro ninguna Categoria asociada al id_producto: "+id});
        }/*SI categoriaEncontrada=TRUE => PROCEDA A COMPROBAR QUE EL USUARIO SEA EL CREADOR DE LA CATEGORIA*/
        
        /******CONDICION IF: PARA QUE UN USUARIO NO PUEDA BORRAR UNA CATEGORIA QUE FUE CREADA POR OTRO******/
        if(categoriaEncontrada.creador.toString() !== req.usuario.id.toString()){/*SI EL {ID} DEL USUARIO_CREADOR DE*** 
            LA CATEGORIA ES !== AL {ID} INGRESADO MEDIANTE LA URL "/id", ENTONCES ESA ACCION ES NO VALIDA***/
            return res.status(404).json({msg: "Accion no valida para este usuario"});
        }/***PERO SI AMBOS ID'S SON IGUALES, => ENTONCES => CONTINUA LA EJECUCION***************************/
        
        /*DE LO CONTRARIO=>ENTONCES PROCEDA A BORRAR LA categoriaEncontrada Categoria.deleteOne({_id: id})**/
        await Categoria.deleteOne({_id: id});/**BORRAR CATEGORIA BY ID**************************************/
        res.status(200).json({msg: "El producto "+categoriaEncontrada.nombre+" Fue borrado con exito"});/***/

    }catch(error){
        res.status(404).json({msg: "WARNING: Error_ID: id_Categoria no valido"});
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