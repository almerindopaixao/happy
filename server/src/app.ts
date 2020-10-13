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

class App {
  public app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
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
  }
}

export default new App().app;
