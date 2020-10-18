import express from 'express';
import { join } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';

import './database/connection';

import OrphanageRoutes from './routes/OrphanagesRoutes';
import UsersRoutes from './routes/UsersRoutes';
import TokenRoutes from './routes/TokenRoutes';
import errorHandle from './errors/handler';

class App {
  public app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(errorHandle);
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      '/uploads/images',
      express.static(join(__dirname, '..', 'uploads', 'images')),
    );
  }

  routes() {
    this.app.use('/orphanages', OrphanageRoutes);
    this.app.use('/register', UsersRoutes);
    this.app.use('/login', TokenRoutes);
  }
}

export default new App().app;
