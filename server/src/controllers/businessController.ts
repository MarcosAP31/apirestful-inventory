import { Request, Response } from 'express';


import pool from '../database';

class BusinessController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const business = await pool.query('SELECT * FROM business');
        res.json(business);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const business = await pool.query('SELECT * FROM business WHERE BusinessId = ?', [id]);
        console.log(business.length);
        if (business.length > 0) {
            return res.json(business[0]);
        }
        res.status(404).json({ text: "The business doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO business set ?', [req.body]);
        res.json({ message: 'Business Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const oldBusiness = req.body;
        await pool.query('UPDATE business set ? WHERE BusinessId = ?', [req.body, id]);
        res.json({ message: "The business was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM business WHERE BusinessId = ?', [id]);
        res.json({ message: "The business was deleted" });
    }
    
   
}


const businessController = new BusinessController;
export default businessController;