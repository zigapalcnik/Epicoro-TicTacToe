import { Logger } from './logger';
import { NoopLogger } from './loggers/noop-logger';
import { LogLevel } from './log-level';
import { environment } from '../../../environments/environment';

/**
 * Logger Factory for creating Logger instances.
 */
export class LoggerFactory {
    private static loggers: Map<string, Logger> = new Map();

    constructor() {
        throw new Error('LoggerFactory can not be instantiated');
    }

    /**
     * Gets Logger with specified logger Name.
     *
     * @param {string} loggerName The Logger Name
     * @return {Logger} The instance of Logger
     */
    public static getLogger(loggerName: string): Logger {
        let logger: Logger = this.loggers.get(loggerName);

        if (!logger) {
            const loggerClass = environment.logger;
            if (loggerClass) {
                // we create Logger class set via environment.logger
                // @ts-ignore
                logger = (new loggerClass(loggerName, LoggerFactory.getCurrentLogLevel)) as Logger;
            } else {
                // by default (if logger class is not set) return No Operation Logger
                // @ts-ignore
                logger = new NoopLogger(loggerName, LoggerFactory.getCurrentLogLevel);
            }

            // put also into map
            this.loggers.set(loggerName, logger);
        }

        return logger;
    }

    /**
     * Gets current Log Level.
     *
     * @return {LogLevel} The Log Level
     */
    public static getCurrentLogLevel(): LogLevel {
        return environment.logLevel;
    }
}
