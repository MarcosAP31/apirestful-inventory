import express, { Router } from 'express';

import clientController from '../controllers/clientController';

class ClientRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', clientController.list);
        this.router.get('/:id', clientController.getOne);
        this.router.get('/email/:email',clientController.getByEmail);
        this.router.post('/', clientController.create);
        this.router.put('/:id', clientController.update);
        this.router.delete('/:id', clientController.delete);
        
        
    }

}

export default new ClientRoutes().router;

