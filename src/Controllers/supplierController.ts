import { Request, Response } from 'express';
import { SupplierServiceImpl } from '../ServicesImpl/SupplierServiceImpl';
import { SupplierService } from '../Services/SupplierService';


class SupplierController {
    protected supplierService: SupplierService;
    constructor() {
        this.supplierService = new SupplierServiceImpl();
        this.list = this.list.bind(this);
        this.getOne = this.getOne.bind(this);
        this.getByBusinessName = this.getByBusinessName.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
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
            res.status(404).json({ text: "The supplier doesn't exits", error: error });
        }

    }

    public async getByBusinessName(req: Request, res: Response): Promise<any> {
        try {
            const { businessName } = req.params;
            const supplier = await this.supplierService.getByBusinessName(businessName);
            return res.json(supplier);
        } catch (error: any) {
            res.status(404).json({ text: "The supplier doesn't exits", error: error });
        }

    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            //const oldSession = req.body;
            const supplierId = await this.supplierService.create(req.body);
            res.json({ message: "The session was created", result: supplierId });
        } catch (error: any) {
            res.status(404).json({ text: "The supplier doesn't exits", error: error });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            //const oldSession = req.body;
            const supplierId = await this.supplierService.update(req.body, id);
            res.json({ message: "The session was updated", result: supplierId });
        } catch (error: any) {
            res.status(500).json({ error: error });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.supplierService.delete(id);
            res.json({ message: "The supplier was deleted" });
        } catch (error: any) {
            res.status(500).json({ error: error });
        }

    }

}


const supplierController = new SupplierController;
export default supplierController;