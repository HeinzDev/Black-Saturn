//isso é um modelo/esquema em JS. É como um objeto que pode ser POSTADO seguindo esse modelo.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
       type: String,
       required: true,
    },
    email: {
        type: String,
       required: true,
    },
    password: {
       type: String,
        required: true,
        minlenght: 7,
    },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;