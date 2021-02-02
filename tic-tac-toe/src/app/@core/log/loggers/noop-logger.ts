import { Logger } from '../logger';
import { LogLevel } from '../log-level';

/**
 * No Operation Logger - It does nothing.
 */
export class NoopLogger extends Logger {
    printLog(level: LogLevel, ...args: any[]) {
        // nothing to do
    }
}
