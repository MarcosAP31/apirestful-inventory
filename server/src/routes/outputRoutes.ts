import express, { Router } from 'express';

import outputController from '../controllers/outputController';

class OutputRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', outputController.list);
        this.router.get('/:id', outputController.getOne);
        this.router.post('/', outputController.create);
        this.router.put('/:id', outputController.update);
        this.router.delete('/:id', outputController.delete);
        
    }

}

export default new OutputRoutes().router;

