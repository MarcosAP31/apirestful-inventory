import express, { Router } from 'express';

import entryController from '../controllers/entryController';

class EntryRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', entryController.list);
        this.router.get('/:id', entryController.getOne);
        this.router.post('/', entryController.create);
        this.router.put('/:id', entryController.update);
        this.router.delete('/:id', entryController.delete);
    }
}
export default new EntryRoutes().router;

