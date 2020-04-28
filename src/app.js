import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import router from './router';

const app = express();

const corsWhiteList = (process.env.CORS_ORIGINS || '').split(',');
const corsOptions = {
  origin: function(origin, callback) {
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(config.apiRoot, router);

export default app;
