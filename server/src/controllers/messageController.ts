import { Request, Response } from 'express';


import pool from '../database';

var token=""
class MessageController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const messages = await pool.query('SELECT * FROM message');
        res.json(messages);
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