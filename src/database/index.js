import mongoose from 'mongoose';
import logger from '../logger';
import { mongo } from '../config';

Object.keys(mongo.options).forEach((key) => {
  mongoose.set(key, mongo.options[key]);
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error: %j', err);
  logger.error('MONGO ERROR', 'MongoDB connection error: %j', err);
  process.exit(-1);
});

mongoose.connection.on('connected', () => {
  logger.info(`MongoDB connection ${mongo.uri} established successsfully`);
});

export const connect = () => {
  mongoose.connect(mongo.uri, { useNewUrlParser: true });
};

export const disconnect = () => {
  mongoose.disconnect();
};
