const REGEX = Object.freeze({
    NUMBER: "/^[0-9]*$/",
    STRING: /^[a-zA-Z0-9:,/_\- ]+$/,
    NAME: /^[a-zA-Z_ ]+$/,
    PHONE: /^[0-9]+$/,
    EMAIL: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    INTEGER: /^\d+$/

});

// Process Env Variables
const BYCRYPT_SALT = process.env.BYCRYPT_SALT != undefined ? Number(process.env.BYCRYPT_SALT) : 10;
const JWT_SALT = process.env.JWT_SALT != undefined ? process.env.JWT_SALT : 'abcdef';

module.exports = {
    REGEX,
    BYCRYPT_SALT,
    JWT_SALT
}