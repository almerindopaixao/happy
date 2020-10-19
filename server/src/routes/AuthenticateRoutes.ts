import { Router } from 'express';

import AuthenticateController from '../controllers/AuthenticateController';

class AuthenticateRoutes {
  public router: Router = Router();

  constructor() {
    this.routes();
  }

  routes() {
    this.router.post('/', AuthenticateController.store);
  }
}

export default new AuthenticateRoutes().router;
