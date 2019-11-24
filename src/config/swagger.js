import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import config from './index';

const appDir = path.normalize(`${__dirname}/..`);
const swaggerDefinition = {
  info: {
    title: '', // title of the API server
    version: '', // version of the API
    description: '', // description of the API
  },
  host: `${config.ip}`,
  basePath: config.apiRoot,
};

const options = {
  swaggerDefinition,
  apis: [
    /** define API js doc here */
  ],
};

const swaggerSpec = swaggerJsDoc(options);

export const spec = swaggerSpec;
export const { serve } = swaggerUi;
export const setup = swaggerUi.setup(swaggerSpec);
