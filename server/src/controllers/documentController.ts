import { Request, Response } from 'express';


import pool from '../database';

class DocumentController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const Documents = await pool.query('SELECT Document.DocumentId,Document.Name,Document.CreationDate,user.UserName as userName,Document.Area,Document.Attention,Document.Enterprise,Document.Device,Document.Price,Document.Path FROM Document INNER JOIN user ON user.UserId=Document.UserId');
        res.json(Documents);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const Document = await pool.query('SELECT * FROM Document WHERE DocumentId = ?', [id]);
        console.log(Document.length);
        if (Document.length > 0) {
            return res.json(Document[0]);
        }
        res.status(404).json({ text: "The Document doesn't exits" });
    }
    public async getDocumentByUserId(req: Request, res: Response): Promise<any> {
        const { userid } = req.params;
        const document = await pool.query('SELECT * FROM document WHERE UserId = ? ORDER BY DocumentId DESC LIMIT 1', [userid]);
        console.log(document.length);
        if (document.length > 0) {
            return res.json(document[0]);
        }else{
            return res.json(null)
        }
        
    }
    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO Document set ?', [req.body]);
        res.json({ message: 'Document Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE Document set ? WHERE DocumentId = ?', [req.body, id]);
        res.json({ message: "The Document was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM Document WHERE DocumentId = ?', [id]);
        res.json({ message: "The produt was deleted" });
    }
   
    
}
const documentController = new DocumentController;
export default documentController;