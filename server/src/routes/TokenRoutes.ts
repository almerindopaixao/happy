import { Router } from 'express';

import TokenCOntroller from '../controllers/TokenController';

class TokenRoutes {
  public router: Router = Router();

  constructor() {
    this.routes();
  }

  routes() {
    this.router.post('/', TokenCOntroller.store);
  }
}

export default new TokenRoutes().router;
