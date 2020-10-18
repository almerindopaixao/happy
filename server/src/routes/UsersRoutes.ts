import { Router } from 'express';

import UsersController from '../controllers/UsersController';

class UsersRoutes {
  public router: Router = Router();

  constructor() {
    this.routes();
  }

  routes() {
    this.router.post('/', UsersController.store);
  }
}

export default new UsersRoutes().router;
