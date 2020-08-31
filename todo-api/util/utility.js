const REGEX = require('../constant/misc').REGEX;

let checkValidEmail = emailid => {
    let email = emailid.toString().trim().toLowerCase();
    let regExp = new RegExp(REGEX.EMAIL);
    return regExp.test(email);
}

module.exports = {
    checkValidEmail
}