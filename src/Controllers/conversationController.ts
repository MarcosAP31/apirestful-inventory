import { Request, Response } from 'express';


import pool from '../database';

class ConversationController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const conversation = await pool.query('SELECT * FROM conversation');
        res.json(conversation);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const conversation = await pool.query('SELECT * FROM conversation WHERE ConversationId = ?', [id]);
        console.log(conversation.length);
        if (conversation.length > 0) {
            return res.json(conversation[0]);
        }
        res.status(404).json({ text: "The conversation doesn't exits" });
    }
    public async getByName(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        const conversation = await pool.query('SELECT * FROM conversation WHERE Name = ?', [name]);
        console.log(conversation.length);
        if (conversation.length > 0) {
            return res.json(conversation[0]);
        }else{
            return res.json(null)
        }
        
    }
    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO conversation set ?', [req.body]);
        res.json({ message: 'Conversation Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const oldSession = req.body;
        await pool.query('UPDATE conversation set ? WHERE ConversationId = ?', [req.body, id]);
        res.json({ message: "The conversation was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM conversation WHERE ConversationId = ?', [id]);
        res.json({ message: "The conversation was deleted" });
    }

    
    
   
}


const conversationController = new ConversationController;
export default conversationController;