import { Request, Response } from 'express';


import pool from '../database';

class UbicationController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const ubication = await pool.query('SELECT * FROM ubication');
        res.json(ubication);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const ubication = await pool.query('SELECT * FROM ubication WHERE Code = ?', [id]);
        console.log(ubication.length);
        if (ubication.length > 0) {
            return res.json(ubication[0]);
        }
        res.status(404).json({ text: "The ubication doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO ubication set ?', [req.body]);
        res.json({ message: 'Ubication Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const oldUbication = req.body;
        await pool.query('UPDATE ubication set ? WHERE Code = ?', [req.body, id]);
        res.json({ message: "The ubication was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM ubication WHERE Code = ?', [id]);
        res.json({ message: "The ubication was deleted" });
    }
    
   
}


const ubicationController = new UbicationController;
export default ubicationController;