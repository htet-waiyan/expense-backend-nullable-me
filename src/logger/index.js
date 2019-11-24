import 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { log } from '../config';

const fileDir = path.join(log.dir);
if (!existsSync(fileDir) && log.enableLogFile) {
  mkdirSync(fileDir);
}

const logger = createLogger({
  level: log.level || 'debug',
  format: format.combine(
    // format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.splat(),
    format.prettyPrint(o => JSON.stringify(o)),
    format.printf(info => `[${info.level}] ${info.timestamp} ${info.message}`),
  ),
  transports: [
    new transports.Console(),
  ],
});

if (log.enableLogFile) {
  const dailyRotateErrorTransport = new transports.DailyRotateFile({
    format: format.json(),
    level: 'error',
    filename: `${log.errorLog}-%DATE%.${log.extension}`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
  });
  const dailyRotateInfoTransport = new transports.DailyRotateFile({
    format: format.json(),
    level: log.level || 'debug',
    filename: `${log.infoLog}-%DATE%.${log.extension}`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
  });
  logger.add(dailyRotateErrorTransport).add(dailyRotateInfoTransport);
}

export default logger;
