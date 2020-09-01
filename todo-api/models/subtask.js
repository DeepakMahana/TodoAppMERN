const mongoose = require('mongoose');

// Initalize Schema
const Schema = mongoose.Schema

// Define a SubTaskSchema
const SubTaskSchema = new Schema({

    todotitle: {
        type: String,
        required: true
    },

    tododesc: {
        type: String,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

});

// Define and Export Model
const SubTask = mongoose.model('SubTask', SubTaskSchema);
module.exports = SubTask;