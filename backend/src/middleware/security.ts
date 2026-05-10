import helmet from 'helmet';
import compression from 'compression';
import xssClean from 'xss-clean';
import hpp from 'hpp';
import { Application } from 'express';

export const applySecurity = (app: Application) => {
  app.use(helmet());
  app.use(compression());
  app.use(xssClean());
  app.use(hpp());
};
