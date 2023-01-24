import { Request, Response } from 'express';


import pool from '../database';

var token=""
class OperationController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const operations = await pool.query('SELECT operation.Date,operation.Description,product.SalePrice AS SalePrice,product.PurchasePrice AS PurchasePrice FROM operation JOIN product ON product.Code=operation.Code');
        res.json(operations);
    }

    

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO operation set ?', [req.body]);
        res.json({ message: 'Operation Saved' });
    }

    
   
}


const operationController = new OperationController;
export default operationController;