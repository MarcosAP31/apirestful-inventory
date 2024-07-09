import express, { Router } from 'express';

import documentController from '../controllers/documentController';

class DocumentRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', documentController.list);
        this.router.get('/:id', documentController.getOne);
        this.router.get('/userid/:userid', documentController.getDocumentByUserId);
        this.router.post('/', documentController.create);
        this.router.put('/:id', documentController.update);
        this.router.delete('/:id', documentController.delete);
        
        
    }

}

export default new DocumentRoutes().router;

