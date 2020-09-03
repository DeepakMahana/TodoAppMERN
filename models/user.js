const mongoose = require('mongoose');

// Initalize Schema
const Schema = mongoose.Schema

// Define a UserSchema
const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    createdBy: {
        type: String,
        default: "Self"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    todoId: [{
        type: Schema.Types.ObjectId,
        ref: 'Todos'
    }]

});

// Define and Export Model
const User = mongoose.model('User', UserSchema);
module.exports = User;

