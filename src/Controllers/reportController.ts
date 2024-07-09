import { Request, Response } from 'express';


import pool from '../database';

var token = ""
class ReportController {

    public async list(req: Request, res: Response): Promise<void> {
        const reports = await pool.query('SELECT report.ReportId,report.Description,report.Category,report.Date FROM report');
        res.json(reports);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const report = await pool.query('SELECT * FROM report WHERE ReportId = ?', [id]);
        console.log(report.length);
        if (report.length > 0) {
            return res.json(report[0]);
        }
        res.status(404).json({ text: "The report doesn't exits" });
    }
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO report set ?', [req.body]);
        res.json({ message: 'Report Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldReport = req.body;
        await pool.query('UPDATE report set ? WHERE ReportId = ?', [req.body, id]);
        res.json({ message: "The report was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM report WHERE ReportId = ?', [id]);
        res.json({ message: "The produt was deleted" });
    }
    
}


const reportController = new ReportController;
export default reportController;