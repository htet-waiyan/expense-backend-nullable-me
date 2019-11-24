import http from 'http';
import app from './app';
import config from './config';
import logger from './logger';
import { connect } from './database';

connect(); // connecting to database;
const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info('Server started at %s', config.port);
});
