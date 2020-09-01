const log = require('../middleware/log');
const MISC = require('../constant/misc');
const MESSAGES = require('../constant/messages');
const Todo = require('../models/todo');
const User = require('../models/user');

let addTodo = async (userid, todotitle, tododesc) => {

    // Create a new Todo
    let newTodo = new Todo({
        todotitle: todotitle,
        tododesc: tododesc
    })

    // Create a Transaction
    const session = await User.startSession();
    session.startTransaction();

    try {

        // Save Todo in DB
        let todo = await newTodo.save()
            .then(res => {
                let val = JSON.parse(JSON.stringify(res));
                log(`Todo Created : ${JSON.stringify(val)}`);
                return val;
            }).catch(err => {
                log(`Error creating Todo, err: ${err.message}`, true, true)
                throw new Error(`Error creating Todo`);
            })

        let linkuser = await User.findOneAndUpdate({ _id: userid }, { "$push": { "todoId": todo._id } })
            .then(res => {
                let val = JSON.parse(JSON.stringify(res));
                log(`User Details: ${JSON.stringify(val)}`);
                return val;
            }).catch(err => {
                log(`No User Found with username : ${username}`, true, true);
                throw new Error(`No User Found`);
            })

        await session.commitTransaction();
        session.endSession();

        return {
            status: MESSAGES.RESPONSE_STATUS.success,
            message: `Todo Created Successfully`,
            data: todo
        }

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return {
            status: MESSAGES.RESPONSE_STATUS.failed,
            message: err.message,
            data: null
        }
    }
}

let deleteTodo = async (userid, todoid) => {

    // Create a Transaction
    const session = await User.startSession();
    session.startTransaction();

    try {

        // Delete Todo
        let todo = await Todo.findByIdAndDelete({ _id: todoid })
            .then(res => {
                let val = JSON.parse(JSON.stringify(res));
                log(`Todo Deleted : ${JSON.stringify(val)}`);
                return val;
            }).catch(err => {
                log(`Error Deleting Todo, err: ${err.message}`, true, true)
                throw new Error(`Error Deleting Todo`);
            })

        let unlinktodo = await User.findOneAndUpdate({ _id: userid }, { "$pull": { "todoId": todo._id } })
            .then(res => {
                let val = JSON.parse(JSON.stringify(res));
                log(`User Details: ${JSON.stringify(val)}`);
                return val;
            }).catch(err => {
                log(`No User Found with username : ${username}`, true, true);
                throw new Error(`No User Found`);
            })

        await session.commitTransaction();
        session.endSession();

        return {
            status: MESSAGES.RESPONSE_STATUS.success,
            message: `Todo Deleted Successfully`,
            data: todo
        }

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return {
            status: MESSAGES.RESPONSE_STATUS.failed,
            message: err.message,
            data: null
        }
    }
}

module.exports = {
    addTodo,
    deleteTodo
}