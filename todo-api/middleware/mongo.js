const mongoose = require('mongoose');
const log = require('../middleware/log');

module.exports = (callback) => {

    const options = {
        poolSize: 15, // Maintain up to 15 socket connections
        socketTimeoutMS: 1000, // Close sockets after 5 minute of inactivity
        connectTimeoutMS: 1000,
        family: 4, // Use IPv4, skip trying IPv6
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    
    const DB_URI = process.env.MONGO_URI_MLAB;

    mongoose.connect(DB_URI, options)
            .then(() => log(`MongoDB Connected ${DB_URI}`))
            .catch(err => log(`MongoDB connect err: ${err}`, true, true));

    return(callback)
}


