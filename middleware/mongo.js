const mongoose = require('mongoose');
const log = require('../middleware/log');

const options = {
    poolSize: 15, // Maintain up to 15 socket connections
    socketTimeoutMS: 0, // Close sockets after 5 minute of inactivity
    connectTimeoutMS: 0,
    family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

let DB_URI = process.env.MONGO_URI;

class MongoDB {

    constructor() {
        this.mongoConnect()
    }

    mongoConnect() {
        // Connect to database via mongoose
        mongoose.connect(DB_URI, options)
            .then(() => log(`MongoDB Connected ${DB_URI}`))
            .catch(err => log(`MongoDB connect err: ${err}`, true, true));
    }
}

module.exports = new MongoDB()

