import { Request, Response } from 'express';


import pool from '../database';

var token=""
class ProductController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const products = await pool.query('SELECT product.ProductId,product.Description,product.Category,product.Amount,product.PurchasePrice,product.SalePrice,supplier.BusinessName AS supplier,product.Image FROM product JOIN supplier ON supplier.SupplierId=product.SupplierId');
        res.json(products);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM product WHERE ProductId = ?', [id]);
        console.log(product.length);
        if (product.length > 0) {
            return res.json(product[0]);
        }
        res.status(404).json({ text: "The product doesn't exits" });
    }
    public async getByDescription(req: Request, res: Response): Promise<any> {
        const { description } = req.params;
        const product = await pool.query('SELECT * FROM product WHERE Description = ?', [description]);
        console.log(product.length);
        if (product.length > 0) {
            return res.json(product[0]);
        }
        res.status(404).json({ text: "The product doesn't exits" });
    }
    public async getByImage(req: Request, res: Response): Promise<any> {
        const { image } = req.params;
        const product = await pool.query('SELECT * FROM product WHERE Image = ?', [image]);
        console.log(product.length);
        if (product.length > 0) {
            return res.json(product[0]);
        }
        res.status(404).json({ text: "The product doesn't exits" });
    }
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO product set ?', [req.body]);
        res.json({ message: 'Product Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProduct = req.body;
        await pool.query('UPDATE product set ? WHERE ProductId = ?', [req.body, id]);
        res.json({ message: "The product was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM product WHERE ProductId = ?', [id]);
        res.json({ message: "The produt was deleted" });
    }
    public async incomes(req:Request,res:Response):Promise<void>{
        const operations = await pool.query('SELECT output.Date AS outputDate,product.ProductId,product.Description,output.Amount AS outputAmount FROM product JOIN output ON output.ProductId=product.ProductId ORDER BY output.Date DESC');
        res.json(operations);
    }
    public async expenses(req:Request,res:Response):Promise<void>{
        const operations = await pool.query('SELECT entry.Date AS entryDate,product.ProductId,product.Description,entry.Amount AS entryAmount FROM product JOIN entry ON entry.ProductId=product.ProductId ORDER BY entry.Date DESC');
        res.json(operations);
    }
    
}


const productController = new ProductController;
export default productController;