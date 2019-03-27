enum LogLevel {
    Info,
    Debug,
    Error,
}
/* tslint:disable:no-console */
export class Logger {

    public static info(object: any) {
        if ([LogLevel.Info, LogLevel.Debug].includes(Logger.LOG_LEVEL)) {
            console.log(object);
        }
    }

    public static debug(object: any) {
        if ([LogLevel.Debug].includes(Logger.LOG_LEVEL)) {
            console.debug(object);
        }
    }

    public static error(object: any) {
        console.error(object);
    }

    private static LOG_LEVEL = LogLevel.Debug;
}