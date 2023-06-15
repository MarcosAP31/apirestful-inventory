import express, { Router } from 'express';

import conversationController from '../controllers/conversationController';

class MessageRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', conversationController.list);
        this.router.get('/:id', conversationController.getOne);
        this.router.get('/name/:name',conversationController.getByName);
        this.router.post('/', conversationController.create);
        this.router.put('/:id', conversationController.update);
        this.router.delete('/:id', conversationController.delete);
        
        
    }

}

export default new MessageRoutes().router;

