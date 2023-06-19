import { Request, Response } from 'express';


import pool from '../database';

var token = ""
class MessageController {
    public async list(req: Request, res: Response): Promise<void> {
        const messages = await pool.query('SELECT message.MessageId,message.Content,message.ShippingDate,user.UserName AS userName,message.ConversatonId FROM message JOIN user ON user.UserId=message.UserId');
        res.json(messages);
    }

    public async getMessagesByConversationId(req: Request, res: Response): Promise<any> {
        const { conversationid } = req.params;
        const messages = await pool.query('SELECT message.MessageId,message.Content,message.ShippingDate,user.UserName AS userName FROM message JOIN user ON user.UserId=message.UserId WHERE ConversationId = ?', [conversationid]);
        console.log(messages.length);
        if (messages.length > 0) {
            return res.json(messages);
        }
        res.status(404).json({ text: "The message doesn't exits" });
    }
    public async getNewMessagesByConversationId(req: Request,req1:Request, res: Response): Promise<any> {
        const { conversationid } = req.params;
        const { datetime }=req1.params;
        const messages = await pool.query('SELECT message.MessageId,message.Content,message.ShippingDate,user.UserName AS userName FROM message JOIN user ON user.UserId=message.UserId WHERE ConversationId = ? AND ShippingDate=?', [conversationid,datetime]);
        console.log(messages.length);
        if (messages.length > 0) {
            return res.json(messages);
        }
        res.status(404).json({ text: "The message doesn't exits" });
    }
    public async getMessagesByUserId(req: Request, res: Response): Promise<any> {
        const { userid } = req.params;
        const message = await pool.query('SELECT * FROM message WHERE UserId = ? ORDER BY MessageId DESC LIMIT 1', [userid]);
        console.log(message.length);
        if (message.length > 0) {
            return res.json(message[0]);
        }else{
            return res.json(null)
        }
        
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO message set ?', [req.body]);
        res.json({ message: 'Message Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldMessage = req.body;
        await pool.query('UPDATE message set ? WHERE MessageId = ?', [req.body, id]);
        res.json({ message: "The message was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM message WHERE MessageId = ?', [id]);
        res.json({ message: "The produt was deleted" });
    }

}


const messageController = new MessageController;
export default messageController;