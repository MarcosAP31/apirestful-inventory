import express, { Router } from 'express';

import messageController from '../controllers/messageController';

class MessageRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', messageController.list);
        this.router.get('/conversationid/:conversationid', messageController.getMessagesByConversationId);
        this.router.get('/unreadconversationid/:conversationid', messageController.getUnreadMessagesByConversationId);
        this.router.get('/lastmessage/:conversationid', messageController.getLastMessageByConversationId);
        this.router.get('/userid/:userid', messageController.getMessagesByUserId);
        this.router.post('/', messageController.create);
        this.router.put('/:id', messageController.update);
        this.router.delete('/:id', messageController.delete);

    }

}

export default new MessageRoutes().router;

