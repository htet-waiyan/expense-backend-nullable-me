import path from 'path';
import merge from 'lodash/merge';
import dotenv from 'dotenv-safe';

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  dotenv.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: requireProcessEnv('PORT') || 3000,
    apiRoot: process.env.API_ROOT || '',
    log: {
      level: 'debug',
      dir: '/app/spllit',
      infoLog: 'info',
      errorLog: 'error',
      extension: 'log',
      enableLogFile: false,
    },
    mongo: {
      options: {
        db: {
          safe: true,
        },
      },
    },
  },
  test: {},
  development: {
    mongo: {
      uri: process.env.DATABASE,
      options: {
        debug: true,
      },
    },
  },
  production: {
    log: {
      level: 'info',
    },
    mongo: {
      uri: process.env.DATABASE,
      options: {
        autoIndex: false,
      },
    },
  },
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
