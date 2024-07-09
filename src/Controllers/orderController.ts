import { Request, Response } from 'express';


import pool from '../database';

class OrderController {
    public async list(req: Request, res: Response): Promise<void> {
        const order = await pool.query('SELECT o.OrderId,o.OrderDate,o.State,o.DeliveryDate,o.TotalPrice,user.UserName AS userName,client.Name AS clientName,client.LastName AS clientLastName FROM `order` AS o JOIN client ON client.ClientId=o.ClientId JOIN user ON user.UserId=o.UserId');
        res.json(order);
    }
    public async listOrderShipped(req: Request, res: Response): Promise<void> {
        const order = await pool.query('SELECT o.OrderId,o.OrderDate,o.State,o.DeliveryDate,o.TotalPrice,user.UserName AS userName,client.Name AS clientName,client.LastName AS clientLastName FROM `order` AS o JOIN client ON client.ClientId=o.ClientId JOIN user ON user.UserId=o.UserId WHERE order.State LIKE "%Despachado%"');
        res.json(order);
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const order = await pool.query('SELECT * FROM `order` WHERE OrderId = ?', [id]);
        console.log(order.length);
        if (order.length > 0) {
            return res.json(order[0]);
        }
        res.status(404).json({ text: "The order doesn't exits" });
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query('INSERT INTO `order` SET ?', [req.body]);
            // Obtén el ID del registro recién insertado
            const insertedId = result.insertId;
            res.json(insertedId);
        } catch (error) {
            console.error(error);
            res.status(500).json({ text: 'Error al crear el pedido' });
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const oldOrder = req.body;
        await pool.query('UPDATE `order` set ? WHERE OrderId = ?', [req.body, id]);
        res.json({ message: "The order was Updated" });
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM `order` WHERE OrderId = ?', [id]);
        res.json({ message: "The order was deleted" });
    }
}
const orderController = new OrderController;
export default orderController;