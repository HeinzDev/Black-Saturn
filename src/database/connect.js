const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model.js');
dotenv.config();

mongoose.set('strictQuery', true);

//Método extendido para criar um usuário admin ao conectar com o banco de dados!
const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexão com o banco de dados estabelecida.');

    // Verifica se já existe um usuário
    User.findOne({ email: 'admin@admin.com' })
      .then(user => {
        if (!user) {
          // Se não houver usuário, cria um novo
          const newUser = new User({
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            isAdmin: true
          });

          newUser.save()
            .then(() => {
              console.log('Criado usuário admin!');
            })
            .catch(error => {
              console.error('Erro ao criar usuário admin:', error);
            });
        }
      })
      .catch(error => {
        console.error('Erro ao buscar usuário:', error);
      });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

module.exports = connectToDataBase;
