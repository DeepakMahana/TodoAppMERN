const MESSAGES = require('../constant/messages');
const UTIL = require('../util/utility');
const USER = require('../core/user');
const TODO = require('../core/todo');
const NULLCHECK = [undefined, null, ''];

// Register 
let register = async (req) => {
    try {

        let email = req.email.toString().trim();
        let username = req.username.toString().trim();
        let password = req.password.toString().trim();

        // Validations
        if (NULLCHECK.includes(email) && UTIL.checkValidEmail(email)) throw new Error('Invalid Email');
        if (NULLCHECK.includes(username)) throw new Error('Invalid User Name');
        if (NULLCHECK.includes(password) && password.length < 6) throw new Error('Invalid Password');

        // Core Logic
        let registerUser = await USER.registerUser(email, username, password);

        // Return response
        return {
            status: registerUser.status,
            message: registerUser.message,
            data: registerUser.data
        }

    } catch (err) {
        return {
            status: MESSAGES.RESPONSE_STATUS.failed,
            message: err.message,
            data: null
        }
    }
}

// Login
let login = async (req) => {

    try {

        let username = req.username.toString().trim();
        let password = req.password.toString().trim();

        // Validations
        if (NULLCHECK.includes(username)) throw new Error('Invalid User Name');
        if (NULLCHECK.includes(password) && password.length < 6) throw new Error('Invalid Password');

        // Core Logic
        let loginUser = await USER.loginUser(username, password);

        // Return response
        return {
            status: loginUser.status,
            message: loginUser.message,
            data: loginUser.data
        }
    } catch (err) {
        return {
            status: MESSAGES.RESPONSE_STATUS.failed,
            message: err.message,
            data: null
        }
    }
}

// Add Todo
let addTodo = async (req) => {

    try {

        let userid = req.user_details.userid;
        let todotitle = req.todotitle.toString().trim();
        let tododesc = req.tododesc.toString().trim();

        // Validations
        if (NULLCHECK.includes(todotitle)) throw new Error('Todo Title Required');
        if (NULLCHECK.includes(tododesc)) throw new Error('Todo Description Required');

        // Core Logic
        let todoRes = await TODO.addTodo(userid, todotitle, tododesc);

        // Return response
        return {
            status: todoRes.status,
            message: todoRes.message,
            data: todoRes.data
        }

    } catch (err) {
        return {
            status: MESSAGES.RESPONSE_STATUS.failed,
            message: err.message,
            data: null
        }
    }

}

// Delete Todo
let deleteTodo = async (req) => {

    try {

        let userid = req.user_details.userid;
        let todoid = req.todoid;

        // Validations
        if (NULLCHECK.includes(todoid)) throw new Error('Todo ID Required');

        // Core Logic
        let todoRes = await TODO.deleteTodo(userid, todoid);

        // Return response
        return {
            status: todoRes.status,
            message: todoRes.message,
            data: todoRes.data
        }

    } catch (err) {
        return {
            status: MESSAGES.RESPONSE_STATUS.failed,
            message: err.message,
            data: null
        }
    }

}

// Add a SubTask

// Delete a SubTask

module.exports = {
    register,
    login,
    addTodo,
    deleteTodo
}