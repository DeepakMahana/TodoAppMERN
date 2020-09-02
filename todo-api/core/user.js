const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const log = require('../middleware/log');
const MISC = require('../constant/misc');
const MESSAGES = require('../constant/messages');
const User = require('../models/user');

let registerUser = async (email, username, password) => {

    // Generate Hash for Pass
    let hashPassword = await bcrypt.hash(password, parseInt(MISC.BYCRYPT_SALT));
    let newUser = new User({
        email: email,
        username: username,
        password: hashPassword
    })
    // Save user in DB
    let user = await newUser.save()
        .then(res => {
            let val = JSON.parse(JSON.stringify(res));
            delete val['password'];
            log(`User Created : ${JSON.stringify(val)}`);
            return val;
        }).catch(err => {
            log(`Error creating User, err: ${err.message}`, true, true)
            return null;
        })

    return {
        status: user == null ? MESSAGES.RESPONSE_STATUS.failed : MESSAGES.RESPONSE_STATUS.success,
        message: user == null ? 'Failed to Register User' : 'User Registered Successfully',
        data: user
    }
}

let loginUser = async (username, password) => {

    // Find User Info using Username
    let userDetails = await User.findOne({ username })
        .then(res => {
            let val = JSON.parse(JSON.stringify(res));
            log(`User Details: ${JSON.stringify(val)}`);
            return val;
        }).catch(err => {
            log(`No User Found with username : ${username}`, true, true);
            return null
        })

    if (userDetails == null) throw new Error(`Username Not Found`)

    // Compare Hash for password
    let match = await bcrypt.compare(password, userDetails.password);
    if (!match) throw new Error(`Incorrect Password`)

    let userid = userDetails._id;
    // Generate JWT Token
    let jwtToken = jwt.sign({ userid, username, password }, MISC.JWT_SALT);

    return {
        status: userDetails == null ? MESSAGES.RESPONSE_STATUS.failed : MESSAGES.RESPONSE_STATUS.success,
        message: userDetails == null ? 'Login Failed' : 'Login Success',
        data: { token: jwtToken }
    }
}

let userinfo = async (userid) => {

    // Find User Info using Username
    let userDetails = await User.findOne({ _id: userid }, '_id username email')
        .then(res => {
            let val = JSON.parse(JSON.stringify(res));
            log(`User Details: ${JSON.stringify(val)}`);
            return val;
        }).catch(err => {
            log(`No User Found with username : ${username}`, true, true);
            return null
        })

    return {
        status: userDetails == null ? MESSAGES.RESPONSE_STATUS.failed : MESSAGES.RESPONSE_STATUS.success,
        message: userDetails == null ? 'User Not Found' : 'User Details Found',
        data: { ...userDetails }
    }
}


module.exports = {
    registerUser,
    loginUser,
    userinfo
}