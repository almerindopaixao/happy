import express from 'express';
import bodyParser from 'body-parser';
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
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/orphanages', OrphanageRoutes);
  }
}

export default new App().app;
