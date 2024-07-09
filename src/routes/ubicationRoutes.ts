import express, { Router } from 'express';

import ubicationController from '../controllers/ubicationController';

class UbicationRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ubicationController.list);
        this.router.get('/:id', ubicationController.getOne);
        this.router.post('/', ubicationController.create);
        this.router.put('/:id', ubicationController.update);
        this.router.delete('/:id', ubicationController.delete);
        
        
    }

}

export default new UbicationRoutes().router;

