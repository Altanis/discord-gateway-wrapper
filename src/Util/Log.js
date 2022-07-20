require('colors');
const moment = require('moment');

class Logger {
    constructor(debug) {
        this.isDebug = debug;
        this.log = console.log;
    }

    info(message) {
        this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.blue);
    }

    debug(message) {
        this.isDebug && this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`);
    }

    severe(message) {
        throw new Error(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.red);
    }

    warn(message) {
        this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.yellow);
    }

    success(message) {
        this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.green);
    }
}

module.exports = { Logger };