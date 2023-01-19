import { Request, Response } from 'express';


import pool from '../database';

var token=""
class ProductController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const products = await pool.query('SELECT product.Code,product.Description,product.Category,product.Amount,product.PurchasePrice,product.SalePrice,supplier.BusinessName AS supplier,product.Image FROM product INNER JOIN supplier ON supplier.SupplierId=product.SupplierId');
        res.json(products);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM product WHERE Code = ?', [id]);
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
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO product set ?', [req.body]);
        res.json({ message: 'Product Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProduct = req.body;
        await pool.query('UPDATE product set ? WHERE Code = ?', [req.body, id]);
        res.json({ message: "The product was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM product WHERE Code = ?', [id]);
        res.json({ message: "The produt was deleted" });
    }
    
}


const productController = new ProductController;
export default productController;