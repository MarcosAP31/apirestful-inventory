import { Request, Response } from 'express';


import pool from '../database';

var token=""
class OutputController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const outputs = await pool.query('SELECT output.ProductId,product.Description AS product,output.Date,client.Name AS clientName,client.LastName AS clientLastName,user.UserName AS userName,output.Amount,product.SalePrice AS salePrice FROM output JOIN product ON product.ProductId=output.ProductId JOIN user ON user.UserId=output.UserId JOIN client ON client.ClientId=output.ClientId');
        res.json(outputs);
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const output = await pool.query('SELECT * FROM output WHERE OutputId = ?', [id]);
        console.log(output.length);
        if (output.length > 0) {
            return res.json(output[0]);
        }
        res.status(404).json({ text: "The output doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO output set ?', [req.body]);
        res.json({ message: 'Output Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        await pool.query('UPDATE output set ? WHERE OutputId = ?', [req.body, id]);
        res.json({ message: "The output was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM output WHERE OutputId = ?', [id]);
        res.json({ message: "The output was deleted" });
    }
   
}


const outputController = new OutputController;
export default outputController;