import express, { Router } from 'express';

import supplierController from '../controllers/supplierController';

class SupplierRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', supplierController.list);
        this.router.get('/:id', supplierController.getOne);
        this.router.get('/businessname/:businessname',supplierController.getByBusinessName);
        this.router.post('/', supplierController.create);
        this.router.put('/:id', supplierController.update);
        this.router.delete('/:id', supplierController.delete);
        
    }

}

export default new SupplierRoutes().router;

