import { LogLevel } from './log-level';

/**
 * No Operation function.
 * @return {any}
 */
const noop = (): any => undefined;

/**
 * Abstract Logger. See also {@link ConsoleLogger} and {@link NoopLogger}.
 */
export abstract class Logger {

    constructor(private loggerName: string, private logLevelCallback: () => LogLevel) {
    }

    /**
     * Prints/process error log trace.
     * @return {any}
     */
    get error() {
        return this.isEnabled(LogLevel.ERROR) ? this._printLog(LogLevel.ERROR) : noop;
    }

    /**
     * Prints/process warning log trace.
     * @return {any}
     */
    get warn() {
        return this.isEnabled(LogLevel.WARN) ? this._printLog(LogLevel.WARN) : noop;
    }

    /**
     * Prints/process information log trace.
     * @return {any}
     */
    get info() {
        return this.isEnabled(LogLevel.INFO) ? this._printLog(LogLevel.INFO) : noop;
    }

    /**
     * Prints/process debug log trace.
     * @return {any}
     */
    get debug() {
        return this.isEnabled(LogLevel.DEBUG) ? this._printLog(LogLevel.DEBUG) : noop;
    }

    /**
     * Prints/process log/trace log trace.
     * @return {any}
     */
    get log() {
        return this.isEnabled(LogLevel.LOG) ? this._printLog(LogLevel.LOG) : noop;
    }

    /**
     * Implement this method to print/process log line.
     *
     * @param args The arguments
     */
    abstract printLog(level: LogLevel, ...args: any[]);

    /**
     * Gets method that will do actual logging.
     * Override this method when you have special case logging (e.g. see {@link ConsoleLogger}).
     * @param {LogLevel} level The Log Level
     * @return {any} The method used for logging
     */
    protected getLoggerMethod(level: LogLevel) {
        return this.printLog;
    }

    /**
     * Binds logger method. Override this method if you need to e.g. add additional parameters to bound method.
     *
     * @param loggerMethod The logger method
     * @param {LogLevel} level The log level
     * @return {any} the bound method
     */
    protected bindLoggerMethod(loggerMethod: any, level: LogLevel) {
        return loggerMethod.bind(this, level);
    }

    /**
     * Gets Logger name.
     * @return {string} The logger Name
     */
    protected getLoggerName(): string {
        return `[${ this.loggerName }]`;
    }

    /**
     * Checks whether specified log level is enabled or not.
     * @param {LogLevel} level
     * @return {Boolean} {@code true} if specified log level is enabled, {@code false} otherwise
     */
    protected isEnabled(level: LogLevel): Boolean {
        return this.getCurrentLogLevel() >= level;
    }

    /**
     * Internal method which takes care of actual printing/processing log traces.
     * @param {LogLevel} level The Log Level
     * @return {any} returns logger method used for logging or {@link noop}
     * @private
     */
    private _printLog(level: LogLevel) {
        const loggerMethod = this.getLoggerMethod(level);

        if (loggerMethod) {
            // bind logger method (prepend logger name, level, ..., in arguments)
            return this.bindLoggerMethod(loggerMethod, level);
        }

        // in case if there is no logger method we do nothing
        return noop;
    }

    /**
     * Gets current log level.
     * @return {LogLevel} The log level
     */
    private getCurrentLogLevel(): LogLevel {
        return this.logLevelCallback();
    }
}
