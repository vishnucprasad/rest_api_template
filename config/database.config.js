'use strict';

const mongoose = require('mongoose');
const logger = require('./logger.config');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const connect = () => {
    const mongoUri = process.env.MONGO_URI;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connecting to mongoose
    mongoose.connect(mongoUri, options);

    // Listen for mongoose connected event
    mongoose.connection.on('connected', () => {
        logger.info(`mongoose connected to ${mongoUri}`);
    });

    // Listen for mongoose connection error event
    mongoose.connection.on('error', (err) => {
        logger.error(`mongoose connection error: ${err}`);
    });

    // Listen for mongoose disconnected event
    mongoose.connection.on('disconnected', () => {
        logger.info('mongoose disconnected');
    });
};

const close = () => {
    // Closing mongoose connection
    mongoose.connection.close(() => {
        logger.info('mongoose disconnected through app termination');
        process.exit(0);
    });
};

module.exports = {
    connect,
    close,
};