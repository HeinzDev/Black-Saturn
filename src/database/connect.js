//Módulo para conexão ao mongo db
//banco de dados em cloud https://cloud.mongodb.com/

const mongoose = require('mongoose');

//Dotenv:  ${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}

const connectToDataBase = async () =>{
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@nodejs.zydkx0g.mongodb.net/database?retryWrites=true&w=majority`, 
    (error) =>{
        if(error){
            return console.log("ocorreu um erro ao conectar ao banco de dados")
        }
    return console.log("conexão ao banco de dados bem sucedida")
    })
}
module.exports = connectToDataBase; 