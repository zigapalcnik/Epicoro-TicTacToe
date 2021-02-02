import { Logger } from '../logger';
import { LogLevel } from '../log-level';

/**
 * Console Logger used for logging traces to browser's console.
 */
export class ConsoleLogger extends Logger {

    printLog(level: LogLevel, ...args: any[]) {
        // not called because we override getLoggerMethod()
    }

    /**
     * Gets logger method from browsers console based on log level.
     *
     * @param {LogLevel} level The Log Level
     * @return {any} returns logger method used for logging or {@link noop}
     * @private
     */
    protected getLoggerMethod(level: LogLevel): any {
        switch (level) {
            case LogLevel.ERROR:
                return console.error;

            case LogLevel.WARN:
                return console.warn;

            case LogLevel.INFO:
                return console.info;

            case LogLevel.DEBUG:
                // tslint:disable-next-line:no-console
                return console.debug;

            case LogLevel.LOG:
                // tslint:disable-next-line:no-console
                return console.log;
        }

        return null;
    }


    protected bindLoggerMethod(loggerMethod: any, level: LogLevel): any {
        return loggerMethod.bind(loggerMethod, this.getLoggerName(), this.getLevelName(level));
    }

    private getLevelName(level: LogLevel) {
        return `[${ LogLevel[level] }]`;
    }
}
