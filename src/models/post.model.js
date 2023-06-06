const mongoose = require('mongoose');
const UserModel = require('./user.model');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
    }
})

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;