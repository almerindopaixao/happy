import { Router } from 'express';

import TokenController from '../controllers/TokenController';

class TokenRoutes {
  public router: Router = Router();

  constructor() {
    this.routes();
  }

  routes() {
    this.router.post('/', TokenController.store);
  }
}

export default new TokenRoutes().router;
