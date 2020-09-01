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
            data: null
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
                // log(`User Details: ${JSON.stringify(val)}`);
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
            data: null
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

let addSubTask = async (todoid, todotitle, tododesc) => {

    // Create a new SubTask
    let newSubTask = {
        todotitle: todotitle,
        tododesc: tododesc
    }

    // Save SubTask into Todo
    let subtask = await Todo.findByIdAndUpdate({ _id: todoid }, { "$push": { "subtasks": newSubTask } })
        .then(res => {
            let val = JSON.parse(JSON.stringify(res));
            log(`Todo Subtask Created : ${JSON.stringify(val)}`);
            return val;
        }).catch(err => {
            log(`Error creating Todo's Subtask, err: ${err.message}`, true, true)
            return null;
        })

    return {
        status: subtask == null ? MESSAGES.RESPONSE_STATUS.failed : MESSAGES.RESPONSE_STATUS.success,
        message: subtask == null ? `Failed to create a Subtask` : `Subtask Created Successfully`,
        data: null
    }

}

let deleteSubTask = async (todoid, subtaskid) => {

    // Delete a subtask of a particular Todo
    let subtask = await Todo.findByIdAndUpdate(todoid, { $pull: { 'subtasks': { _id: subtaskid } } })
        .then(res => {
            let val = JSON.parse(JSON.stringify(res));
            log(`Todo Subtask Deleted : ${JSON.stringify(val)}`);
            return val;
        }).catch(err => {
            log(`Error Deleting Todo's Subtask, err: ${err.message}`, true, true)
            return null;
        })

    return {
        status: subtask == null ? MESSAGES.RESPONSE_STATUS.failed : MESSAGES.RESPONSE_STATUS.success,
        message: subtask == null ? `Failed to delete a Subtask` : `Subtask Deleted Successfully`,
        data: null
    }
}

module.exports = {
    addTodo,
    deleteTodo,
    addSubTask,
    deleteSubTask
}