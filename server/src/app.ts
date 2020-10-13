import express from 'express';
import 'dotenv/config';

class App {
  public app = express();
}

export default new App().app;
