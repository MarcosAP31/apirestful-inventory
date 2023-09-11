import express, { Router } from 'express';

import reportController from '../controllers/reportController';

class ReportRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', reportController.list);
        this.router.get('/:id', reportController.getOne);
        this.router.post('/', reportController.create);
        this.router.put('/:id', reportController.update);
        this.router.delete('/:id', reportController.delete);
        
        
    }

}

export default new ReportRoutes().router;

