const mongoose = require('mongoose');

const connectToDataBase = async () =>{
    await mongoose.connect(`mongodb://localhost:27017`, 
    (error) =>{
        if(error){
            return console.log("ocorreu um erro ao conectar ao banco de dados")
        }
    return console.log("conexão ao banco de dados bem sucedida")
    })
}
module.exports = connectToDataBase; 