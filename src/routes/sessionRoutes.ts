import express, { Router } from 'express';

import sessionController from '../controllers/sessionController';

class SessionRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', sessionController.list);
        this.router.get('/:id', sessionController.getOne);
        this.router.post('/', sessionController.create);
        this.router.put('/:id', sessionController.update);
        this.router.delete('/:id', sessionController.delete);
        this.router.get('/userid/:userid',sessionController.getByUser);
        
    }

}

export default new SessionRoutes().router;

