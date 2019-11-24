import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import router from './router';

const app = express();

// TODO: restrict only some origins
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(config.apiRoot, router);

export default app;
