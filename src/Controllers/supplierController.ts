import { Request, Response } from 'express';
import { SupplierServiceImpl } from '../ServicesImpl/SupplierServiceImpl';
import { SupplierService } from '../Services/SupplierService';


class SupplierController {
    protected supplierService: SupplierService;
    constructor() {
        this.supplierService = new SupplierServiceImpl();
        // Asegura que el método esté vinculado al contexto correcto

    }
    public async list(req: Request, res: Response): Promise<any> {
        try {
            const suppliers = await this.supplierService.list();
            return res.json(suppliers);
        } catch (error: any) {
            res.status(500).json({ error: error });
        }

    }

    public async getOne(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const supplier = await this.supplierService.getOne(id);
            return res.json(supplier);
        } catch (error: any) {
            res.status(404).json({ text:"The supplier doesn't exits",error: error });
        }

    }

    public async getByBusinessName(req: Request, res: Response): Promise<any> {
        try {
            const { businessName } = req.params;
            const supplier = await this.supplierService.getByBusinessName(businessName);
            return res.json(supplier);
        } catch (error: any) {
            res.status(404).json({ text:"The supplier doesn't exits",error: error });
        }

    }

    public async save(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            let supplier: any = '';
            if (id == null) {
                supplier = await this.supplierService.create(req.body);
            } else {
                supplier = await this.supplierService.update(req.body, id);
            }
            return res.json({ message: 'Supplier Saved', result: supplier });
        } catch (error: any) {
            res.status(500).json({ error: error });
        }

    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM supplier WHERE SupplierId = ?', [id]);
            res.json({ message: "The supplier was deleted" });
        } catch (error: any) {
            res.status(500).json({ error: error });
        }

    }

}


const supplierController = new SupplierController;
export default supplierController;