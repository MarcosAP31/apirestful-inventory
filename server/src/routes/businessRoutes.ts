import express, { Router } from 'express';

import businessController from '../controllers/businessController';

class BusinessRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', businessController.list);
        this.router.get('/:id', businessController.getOne);
        this.router.post('/', businessController.create);
        this.router.put('/:id', businessController.update);
        this.router.delete('/:id', businessController.delete);
        
        
    }

}

export default new BusinessRoutes().router;

