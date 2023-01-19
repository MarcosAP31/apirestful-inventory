import express, { Router } from 'express';

import saleController from '../controllers/saleController';

class SaleRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', saleController.list);
        this.router.get('/:id', saleController.getOne);
        this.router.post('/', saleController.create);
        this.router.put('/:id', saleController.update);
        this.router.delete('/:id', saleController.delete);
        
    }

}

export default new SaleRoutes().router;

