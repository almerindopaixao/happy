import { Router } from 'express';

import OrphanagesController from '../controllers/OrphanagesController';

class OrphanageRoutes {
  public router: Router = Router();

  constructor() {
    this.routes();
  }

  routes() {
    this.router.get('/', OrphanagesController.Index);
    this.router.post('/', OrphanagesController.Store);
    this.router.get('/:id', OrphanagesController.Show);
  }
}

export default new OrphanageRoutes().router;
