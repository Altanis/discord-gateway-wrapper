import colors from 'colors';
import moment from 'moment';

colors;

class Logger {
    isDebug: boolean;
    log: Function;

    constructor(debug: boolean) {
        this.isDebug = debug;
        this.log = console.log;
    }

    info(message: string) {
        this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.blue);
    }

    debug(message: string) {
        this.isDebug && this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`);
    }

    severe(message: string) {
        throw new Error(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.red);
    }

    warn(message: string) {
        this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.yellow);
    }

    success(message: string) {
        this.log(`${moment().format('MM/DD/YYYY hh:mm:ss a').toUpperCase().bold}: ${message}`.green);
    }
}

export default Logger;