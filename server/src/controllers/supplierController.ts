import { Request, Response } from 'express';


import pool from '../database';
const jwt=require("jsonwebtoken");
var token=""
class SupplierController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const suppliers = await pool.query('SELECT * FROM supplier');
        res.json(suppliers);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const supplier = await pool.query('SELECT * FROM supplier WHERE SupplierId = ?', [id]);
        console.log(supplier.length);
        if (supplier.length > 0) {
            return res.json(supplier[0]);
        }
        res.status(404).json({ text: "The supplier doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO supplier set ?', [req.body]);
        res.json({ message: 'Supplier Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        await pool.query('UPDATE supplier set ? WHERE SupplierId = ?', [req.body, id]);
        res.json({ message: "The supplier was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM supplier WHERE SupplierId = ?', [id]);
        res.json({ message: "The supplier was deleted" });
    }
   
}


const supplierController = new SupplierController;
export default supplierController;