import colors from 'colors';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import format from 'date-fns/format';
import route from './route';

const { combine, timestamp, label, printf, splat } = winston.format;

type ILevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

const formatDate = (dateStr: string) => format(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss');

// eslint-disable-next-line @typescript-eslint/no-shadow
const myConsoleFormat = printf(({ level, message, label, timestamp }) => {
  const levelStr = (() => {
    switch (level as ILevel) {
      case 'error':
        return 'bgRed';
      case 'debug':
        return 'bgGray';
      case 'http':
        return 'bgBlue';
      case 'info':
        return 'bgGreen';
      case 'silly':
        return 'bgGray';
      case 'verbose':
        return 'bgGray';
      case 'warn':
        return 'bgYellow';
      default:
        return 'bgGray';
    }
  })();
  /* @ts-ignore */
  return `${colors.bold(label)} ${colors[levelStr](`[${level.toUpperCase()}]`)} ${colors.underline(
    formatDate(timestamp),
  )} ${colors.dim(message)}`;
});

const myFileFormat = printf(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ({ level, message, timestamp }) => `${formatDate(timestamp)} [${level}] ${message}`,
);

const fileFormat = combine(splat(), timestamp(), myFileFormat);
const consoleFormat = combine(label({ label: 'HV-Com' }), timestamp(), myConsoleFormat);

const drfAllTransport = new DailyRotateFile({
  format: fileFormat,
  dirname: route.logRoute,
  filename: 'log-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '50m',
  maxFiles: '14d',
  level: 'silly',
});

const drfErrorTransport = new DailyRotateFile({
  format: fileFormat,
  dirname: route.logRoute,
  filename: 'error-%DATE%.log.gz',
  datePattern: 'YYYY-MM-DD',
  maxSize: '50m',
  maxFiles: '365d',
  level: 'error',
});

const consoleTransport = new winston.transports.Console({
  format: consoleFormat,
  level: process.env.NODE_ENV === 'production' ? 'verbose' : 'silly',
});

const logger = winston.createLogger({
  transports: [drfAllTransport, drfErrorTransport, consoleTransport],
});

export default logger;
