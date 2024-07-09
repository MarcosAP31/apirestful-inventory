import { Request, Response } from 'express';


import pool from '../database';

var token=""
class SaleXProductController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const salexproducts = await pool.query('SELECT * FROM salexproduct');
        res.json(salexproducts);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const salexproduct = await pool.query('SELECT * FROM salexproduct WHERE SaleXProductId = ?', [id]);
        console.log(salexproduct.length);
        if (salexproduct.length > 0) {
            return res.json(salexproduct[0]);
        }
        res.status(404).json({ text: "The salexproduct doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO salexproduct set ?', [req.body]);
        res.json({ message: 'Entry Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        await pool.query('UPDATE salexproduct set ? WHERE SaleXProductId = ?', [req.body, id]);
        res.json({ message: "The salexproduct was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM salexproduct WHERE SaleXProductId = ?', [id]);
        res.json({ message: "The salexproduct was deleted" });
    }
   
}


const salexproductController = new SaleXProductController;
export default salexproductController;