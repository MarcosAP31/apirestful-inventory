import express, { Router } from 'express';

import orderxproductController from '../controllers/orderxproductController';

class OrderXProductRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }
    

    config() {
        this.router.get('/', orderxproductController.list);
        this.router.get('/:id', orderxproductController.getOne);
        this.router.get('/orderid/:orderid', orderxproductController.getByOrderId);
        this.router.post('/', orderxproductController.create);
        this.router.put('/:id', orderxproductController.update);
        this.router.delete('/:id', orderxproductController.delete);

    }

}

export default new OrderXProductRoutes().router;

