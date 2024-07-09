import pool from '../database';
export class SupplierRepository {
    public async list(): Promise<any> {
        try {
            const suppliers = await pool.query('SELECT * FROM supplier');
            return suppliers;
        } catch (error) {
            console.error('Error listing suppliers:', error);
            throw new Error(`Error listing suppliers: ${error}`);
            //res.status(500).json({ error: 'Error initiating login' });
        }

    }

    public async getOne(id: any): Promise<any> {
        try {
            const supplier = await pool.query('SELECT * FROM supplier WHERE SupplierId = ?', [id]);
            console.log(supplier.length);
            if (supplier.length > 0) {
                return supplier[0];
            } else {
                console.log("The supplier doesn't exits");
            }
        } catch (error) {
            console.error("The supplier doesn't exits", error);
            throw new Error(`Error getting supplier: ${error}`);
            //res.status(500).json({ error: 'Error initiating login' });
        }

    }

    public async getByBusinessName(businessName: any): Promise<any> {
        try {
            const supplier = await pool.query(' SELECT * FROM supplier WHERE BusinessName = ?', [businessName]);
            console.log(supplier.length);
            if (supplier.length > 0) {
                return supplier[0];
            }
        } catch (error) {
            console.error("The supplier doesn't exits", error);
            throw new Error(`Error getting supplier: ${error}`);
            //res.status(500).json({ error: 'Error initiating login' });
        }

    }

    public async create(body: any): Promise<any> {
        try {
            const result = await pool.query('INSERT INTO supplier set ?', [body]);
            console.log('Supplier was created');
            return result.SupplierId;
        } catch (error) {
            console.error('Error creating supplier:', error);
            throw new Error(`Error creating supplier: ${error}`);
            //res.status(500).json({ error: 'Error initiating login' });
        }

    }

    public async update(body: any, id: any): Promise<any> {
        try {
            const result = await pool.query('UPDATE supplier set ? WHERE SupplierId = ?', [body, id]);
            console.log('The supplier was updated');
            return result.SupplierId;
        } catch (error) {
            console.error('Error updating supplier:', error);
            throw new Error(`Error updating supplier: ${error}`);
            //res.status(500).json({ error: 'Error initiating login' });
        }

    }

    public async delete(id: any): Promise<void> {
        try {
            await pool.query('DELETE FROM supplier WHERE SupplierId = ?', [id]);
            console.log('The supplier was deleted')
        } catch (error) {
            console.error('Error deleting supplier:', error);
            throw new Error(`Error udeleing supplier: ${error}`);
            //res.status(500).json({ error: 'Error initiating login' });
        }

    }
}