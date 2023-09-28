import { Request, Response } from 'express';


import pool from '../database';

var token=""
class OperationController {
    
    public async listOperations(req: Request, res: Response): Promise<void> {
        const operations = await pool.query('SELECT operation.OperationId,operation.Date,operation.Description,product.SalePrice AS salePrice,product.PurchasePrice AS purchasePrice,user.UserName AS userName FROM operation JOIN product ON product.ProductId=operation.ProductId JOIN user ON user.UserId=operation.UserId WHERE operation.Description LIKE "%Compra%" OR operation.Description LIKE "%Venta%"');
        res.json(operations);
    }
    public async listMovements(req: Request, res: Response): Promise<void> {
        const operations = await pool.query('SELECT operation.OperationId,operation.Date,operation.Description,product.SalePrice AS salePrice,product.PurchasePrice AS purchasePrice,user.UserName AS userName FROM operation JOIN product ON product.ProductId=operation.ProductId JOIN user ON user.UserId=operation.UserId WHERE operation.Description LIKE "%Se agregó%" OR operation.Description LIKE "%Se movió%" OR operation.Description LIKE "%Se devolvió%"');
        res.json(operations);
    }
    public async getLastOperationsByProductId(req: Request, res: Response): Promise<void> {
        const { productid } = req.params;
        const operations = await pool.query('SELECT operation.OperationId,operation.Date,operation.Description,product.SalePrice AS salePrice,product.PurchasePrice AS purchasePrice,user.UserName AS userName FROM operation JOIN product ON product.ProductId=operation.ProductId JOIN user ON user.UserId=operation.UserId WHERE ProductId = ? ORDER BY OperationId DESC LIMIT 1',[productid]);
        res.json(operations);
    }
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO operation set ?', [req.body]);
        res.json({ message: 'Operation Saved' });
    }
   
}


const operationController = new OperationController;
export default operationController;