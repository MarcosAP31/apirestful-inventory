import express, { Router } from 'express';

import salexproductController from '../controllers/salexproductController';

class SaleXProductRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', salexproductController.list);
        this.router.get('/:id', salexproductController.getOne);
        this.router.post('/', salexproductController.create);
        this.router.put('/:id', salexproductController.update);
        this.router.delete('/:id', salexproductController.delete);
        
    }

}

export default new SaleXProductRoutes().router;

