const mongoose = require('mongoose');

// Initalize Schema
const Schema = mongoose.Schema

// Define a TodoSchema
const TodosSchema = new Schema({

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
    },

    subtasks: [{

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
    }]

});

// Define and Export Model
const Todos = mongoose.model('Todos', TodosSchema);
module.exports = Todos;


