const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        //Atributos de conexion de MongoDB con Mongoose
        const connection = await mongoose.connect(
            "mongodb+srv://admin:Cs2016312@cluster0.vgmfqff.mongodb.net/?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            const url = `${connection.connection.host}:${connection.connection.port}`;
            console.log(`MongoDB Conectado en :${url}`);

    }catch(error){
        console.log(`error:${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

