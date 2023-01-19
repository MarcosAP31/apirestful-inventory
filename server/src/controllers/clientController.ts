import { Request, Response } from 'express';


import pool from '../database';
const jwt=require("jsonwebtoken");
var token=""
class ClientController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const clients = await pool.query('SELECT * FROM client');
        res.json(clients);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const client = await pool.query('SELECT * FROM client WHERE ClientId = ?', [id]);
        console.log(client.length);
        if (client.length > 0) {
            return res.json(client[0]);
        }
        res.status(404).json({ text: "The client doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO client set ?', [req.body]);
        res.json({ message: 'Client Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldClient = req.body;
        await pool.query('UPDATE client set ? WHERE ClientId = ?', [req.body, id]);
        res.json({ message: "The client was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM client WHERE ClientId = ?', [id]);
        res.json({ message: "The client was deleted" });
    }
    
   
}


const clientController = new ClientController;
export default clientController;