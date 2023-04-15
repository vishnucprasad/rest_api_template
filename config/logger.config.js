'use strict';

const { format, transports, createLogger } = require('winston');

const consoleTramsport = new transports.Console({ json: false, timestamp: true });
const debugFileTransport = new transports.File({ filename: `${__dirname}/../logs/debug.log` });
const exceptionFileTransport = new transports.File({ filename: `${__dirname}/../logs/exceptions.log` });

const options = {
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
    ),
    transports: [
        consoleTramsport,
        debugFileTransport,
    ],
    exceptionHandlers: [
        consoleTramsport,
        exceptionFileTransport,
    ],
    exitOnError: false,
};

const logger = new createLogger(options);

module.exports = logger;