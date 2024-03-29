import express, { Router } from 'express';

import productController from '../controllers/productController';

class ProductRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', productController.list);
        this.router.get('/:id', productController.getOne);
        this.router.post('/', productController.create);
        this.router.put('/:id', productController.update);
        this.router.delete('/:id', productController.delete);
        this.router.get('/description/:description', productController.getByDescription);
        this.router.get('/operations/incomes', productController.incomes);
        this.router.get('/operations/expenses', productController.expenses);
        this.router.get('/image/:image', productController.getByImage);
    }

}

export default new ProductRoutes().router;

