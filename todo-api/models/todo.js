const mongoose = require('mongoose');

// Initalize Schema
const Schema = mongoose.Schema

// Define a TodoSchema
const TodoSchema = new Schema({

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
const Todo = mongoose.model('Todo', TodoSchema);

// Define a TodosSchema
const TodosSchema = new Schema({

    todos: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',

        subtask: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
        }
    }]

});

// Define and Export Model
const Todos = mongoose.model('Todos', TodosSchema);
module.exports = Todos;

