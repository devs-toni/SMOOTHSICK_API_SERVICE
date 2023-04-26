const { appendFile } = require("fs");
const { dirname, join } = require("path");
const appDir = dirname(require.main?.filename);
const logPath: string = join(appDir, "/activity.log");

export const writeLog = (data: string): void => {
    const date: string = new Date().toISOString().split("T")[0] as string;
    const time: string = new Date().toISOString().split("T")[1] as string;
    try {
        appendFile(logPath, date + " " + time + " LOGGER: " + data + "\n", "utf-8", (err: object) => {
            if (err) throw err;
        });
    } catch (error) {
        console.error(error);
    }
}