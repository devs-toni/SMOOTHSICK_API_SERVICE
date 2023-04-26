import * as winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    verbose: "gray",
    debug: "blue",
    silly: "grey",
};

const level = (): string => {
    const env: string = (process.env['NODE_ENV'] as string) || "development";
    const isDevelopment: boolean = env === "development";
    return isDevelopment ? "debug" : "warn";
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
    winston.format.colorize({
        all: true,
    }),
    winston.format.label({
        label: "[LOGGER]",
    }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm" }),
    winston.format.align(),
    winston.format.printf(
        (info) => `${ info['timestamp']} ${ info.level }: ${ info.message }`
    )
);

const logFormat = winston.format.combine(
    winston.format.label({
        label: "[LOGGER]",
    }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm" }),
    winston.format.align(),
    winston.format.printf(
        (info) => `${ info['timestamp']} ${ info.level }: ${ info.message }`
    )
);

const winstonLogger = winston.createLogger({
    level: level(),
    levels,
    transports: [
        new winston.transports.Console({
            format: consoleFormat
        }),
        new winston.transports.File({
            filename: "/error.log",
            level: "error",
            format: logFormat
        }),
        new winston.transports.File({
            filename: "/all.log",
            format: logFormat
        }),
    ],
});

export const loggerStream = {
    write: (message: string) =>
        winstonLogger.http(message.substring(0, message.lastIndexOf("\n"))),
};