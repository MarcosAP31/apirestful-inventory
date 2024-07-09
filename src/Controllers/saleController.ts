import { Request, Response } from 'express';


import pool from '../database';

var token=""
class SaleController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const sales = await pool.query('SELECT * FROM sale');
        res.json(sales);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const sale = await pool.query('SELECT * FROM sale WHERE SaleId = ?', [id]);
        console.log(sale.length);
        if (sale.length > 0) {
            return res.json(sale[0]);
        }
        res.status(404).json({ text: "The sale doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO sale set ?', [req.body]);
        res.json({ message: 'Sale Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        await pool.query('UPDATE sale set ? WHERE SaleId = ?', [req.body, id]);
        res.json({ message: "The sale was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM sale WHERE SaleId = ?', [id]);
        res.json({ message: "The sale was deleted" });
    }
   
}


const saleController = new SaleController;
export default saleController;