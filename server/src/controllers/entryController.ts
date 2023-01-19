import { Request, Response } from 'express';


import pool from '../database';

var token=""
class EntryController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const entrys = await pool.query('SELECT entry.Code,product.Description AS product,entry.Amount,entry.Date,user.Name AS user FROM entry JOIN product ON product.Code=entry.Code JOIN user ON user.UserId=entry.UserId');
        res.json(entrys);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const entry = await pool.query('SELECT * FROM entry WHERE EntryId = ?', [id]);
        console.log(entry.length);
        if (entry.length > 0) {
            return res.json(entry[0]);
        }
        res.status(404).json({ text: "The entry doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO entry set ?', [req.body]);
        res.json({ message: 'Entry Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        await pool.query('UPDATE entry set ? WHERE EntryId = ?', [req.body, id]);
        res.json({ message: "The entry was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM entry WHERE EntryId = ?', [id]);
        res.json({ message: "The entry was deleted" });
    }
   
}


const entryController = new EntryController;
export default entryController;