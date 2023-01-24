import express, { Router } from 'express';

import operationController from '../controllers/operationController';

class OperationRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', operationController.list);
        this.router.post('/', operationController.create);
    }
}
export default new OperationRoutes().router;

