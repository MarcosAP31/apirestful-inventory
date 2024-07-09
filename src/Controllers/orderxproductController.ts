import { Request, Response } from 'express';


import pool from '../database';
const jwt=require("jsonwebtoken");
var token=""
class OrderXProductController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const orderxproducts = await pool.query('SELECT * FROM orderxproduct ');
        res.json(orderxproducts);
    }
    public async listOrderShipped(req: Request, res: Response): Promise<void> {
        const orderxproducts = await pool.query('SELECT * FROM orderxproduct');
        res.json(orderxproducts);
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const orderxproduct = await pool.query('SELECT * FROM orderxproduct WHERE OrderXProductId = ?', [id]);
        console.log(orderxproduct.length);
        if (orderxproduct.length > 0) {
            return res.json(orderxproduct[0]);
        }
        res.status(404).json({ text: "The orderxproduct doesn't exits" });
    }
    public async getByOrderId(req: Request, res: Response): Promise<any> {
        const { orderid } = req.params;
        const orderxproducts = await pool.query('SELECT * FROM orderxproduct WHERE OrderId = ?', [orderid]);
        console.log(orderxproducts.length);
        if (orderxproducts.length > 0) {
            return res.json(orderxproducts);
        }
        res.status(404).json({ text: "The orderxproduct doesn't exits" });
    }
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO orderxproduct set ?', [req.body]);
        res.json({ message: 'OrderXProduct Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldOrderXProduct = req.body;
        await pool.query('UPDATE orderxproduct set ? WHERE OrderXProductId = ?', [req.body, id]);
        res.json({ message: "The orderxproduct was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM orderxproduct WHERE OrderXProductId = ?', [id]);
        res.json({ message: "The orderxproduct was deleted" });
    }
    
   
}


const orderxproductController = new OrderXProductController;
export default orderxproductController;