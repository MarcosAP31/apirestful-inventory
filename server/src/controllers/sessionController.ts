import { Request, Response } from 'express';


import pool from '../database';

class SessionController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const session = await pool.query('SELECT session.SessionId,session.LoginTime,session.LogoutTime,user.Name AS name,user.LastName AS lastName FROM session INNER JOIN user ON user.UserId=session.UserId');
        res.json(session);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const session = await pool.query('SELECT * FROM session WHERE SessionId = ?', [id]);
        console.log(session.length);
        if (session.length > 0) {
            return res.json(session[0]);
        }
        res.status(404).json({ text: "The session doesn't exits" });
    }
    public async getByUser(req: Request, res: Response): Promise<any> {
        const { userid } = req.params;
        const session = await pool.query('SELECT * FROM session WHERE UserId = ? ORDER BY SessionId DESC LIMIT 1', [userid]);
        console.log(session.length);
        if (session.length > 0) {
            return res.json(session[0]);
        }
        res.status(404).json({ text: "The session doesn't exist" });
    }
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO session set ?', [req.body]);
        res.json({ message: 'Session Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const oldSession = req.body;
        await pool.query('UPDATE session set ? WHERE SessionId = ?', [req.body, id]);
        res.json({ message: "The session was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM session WHERE SessionId = ?', [id]);
        res.json({ message: "The session was deleted" });
    }

    
    
   
}


const sessionController = new SessionController;
export default sessionController;