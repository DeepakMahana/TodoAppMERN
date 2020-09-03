const log = require('../middleware/log')
const jwt = require("jsonwebtoken");
const MISC = require('../constant/misc');
const MESSAGES = require('../constant/messages');

let validateToken = async (req, res, next) => {

    // Header Checks
    let statusCode = 400;
    let message = "Invalid Headers";

    try {

        if (typeof req['headers'] == "undefined") {
            return res.status(statusCode).json({ status: MESSAGES.RESPONSE_STATUS.failed, message: message })
        }

        let { authorization } = req.headers;

        if (typeof authorization == "undefined" || !authorization.startsWith("Bearer ")) {
            res.statusCode = statusCode;
            return res.status(statusCode).json({ status: MESSAGES.RESPONSE_STATUS.failed, message: message })
        }

        // Extract JWT Token from Auth Headers
        let token = authorization.slice(7, authorization.length);

        // Verify Token
        let result = await verifyToken(token)
            .then(res => {
                return res;
            }).catch(err => {
                return err;
            })
        statusCode = 500;
        if (typeof result == 'string') return res.status(statusCode).json({ status: MESSAGES.RESPONSE_STATUS.failed, message: result })

        req["body"]["user_details"] = { userid: result.userid, username: result.username }
        next()

    } catch (err) {
        log(`ApiAccess Middleware err: ${err}`, true, true);
        res.status(statusCode).json({ status: MESSAGES.RESPONSE_STATUS.failed, message: result })
    }

}

let verifyToken = (token) => {
    if (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, MISC.JWT_SALT, async (err, res) => {
                if (err) {
                    reject("Invalid Token Key");
                } else {
                    let { userid, username } = res;
                    resolve({ userid, username });
                }
            })
        })
    } else {
        return Promise.reject("Auth Token not provided")
    }
}

module.exports = {
    validateToken
}
