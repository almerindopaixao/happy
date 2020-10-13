import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import 'dotenv/config';

import './database/connection';

class App {
  public app = express();

  middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

export default new App().app;
