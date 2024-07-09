export interface SupplierService{
    list():Promise<any>;
    getOne(id:any):Promise<any>;
    getByBusinessName(businessName: any):Promise<any>;
    create(body:any):Promise<any>;
    update(body:any,id:any):Promise<any>;
    delete(id:any):Promise<void>;
}