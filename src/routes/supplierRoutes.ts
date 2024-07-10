import express, { Router } from 'express';

import SupplierController from '../Controllers/SupplierController';

class SupplierRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', SupplierController.list);
        this.router.get('/:id', SupplierController.getOne);
        this.router.get('/businessname/:businessname',SupplierController.getByBusinessName);
        this.router.post('/', SupplierController.create);
        this.router.put('/:id', SupplierController.update);
        this.router.delete('/:id', SupplierController.delete);
        
    }

}

export default new SupplierRoutes().router;

