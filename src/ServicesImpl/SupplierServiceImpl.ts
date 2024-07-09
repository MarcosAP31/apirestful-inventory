import { SupplierRepository } from "../Repositories/SupplierRepository";
import { SupplierService } from "../Services/SupplierService";
export class SupplierServiceImpl implements SupplierService{
    protected supplierRepository:SupplierRepository;
    constructor(){
        this.supplierRepository = new SupplierRepository();
    }
    public async list():Promise<any>{
        return this.supplierRepository.list();
    }
    public async getOne(id:any):Promise<any>{
        return this.supplierRepository.getOne(id);
    }
    public async getByBusinessName(businessName: any):Promise<any>{
        return this.supplierRepository.getByBusinessName(businessName);
    }
    public async create(body:any):Promise<any>{
        return this.supplierRepository.create(body);
    }
    public async update(body:any,id:any):Promise<any>{
        return this.supplierRepository.update(body,id);
    }
    public async delete(id:any):Promise<void>{
        this.supplierRepository.delete(id);
    }
}
