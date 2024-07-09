import express, { Router } from 'express';

import operationController from '../controllers/operationController';

class OperationRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }
    config() {
        this.router.get('/', operationController.listOperations);
        this.router.get('/movement/', operationController.listMovements);
        this.router.get('/productid/:productid', operationController.getLastOperationsByProductId);
        this.router.post('/', operationController.create);
    }
}
export default new OperationRoutes().router;

