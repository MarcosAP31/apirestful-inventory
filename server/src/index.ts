import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import bodyParser from 'body-parser';
import multer from 'multer';

import mysqlConnection from './database';
import path from 'path';
import fs from 'fs';
//const fs = require('fs').promises;
import indexRoutes from './routes/indexRoutes';
import clientRoutes from './routes/clientRoutes';
import entryRoutes from './routes/entryRoutes';
import outputRoutes from './routes/outputRoutes';
import productRoutes from './routes/productRoutes';
import saleRoutes from './routes/saleRoutes';
import salexproductRoutes from './routes/salexproductRoutes';
import supplierRoutes from './routes/supplierRoutes';
import userRoutes from './routes/userRoutes';
import operationRoutes from './routes/operationRoutes';
import messageRoutes from './routes/messageRoutes';
const jwt=require("jsonwebtoken");
class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    
    config(): void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        
    }

    routes(): void {

        this.app.use('/', indexRoutes);
        this.app.use('/apistore/client', clientRoutes);
        /*
        this.app.post('/apistore/client/login',(req,res)=>{
            const client={
                id:1,
                nombre:"marcos",
                email:"marcos12@gmail.com"
            }
            jwt.sign({client},'secretkey',{expiresIn:'32s'},((err:any,token:any)=>{
                res.json({
                    token
                });
            }));
        })*/
        
        this.app.use('/apistore/entry', entryRoutes);
        this.app.use('/apistore/output', outputRoutes);
        this.app.use('/apistore/product', productRoutes);
        this.app.use('/apistore/sale', saleRoutes);
        this.app.use('/apistore/salexproduct', salexproductRoutes);
        this.app.use('/apistore/supplier', supplierRoutes);
        this.app.use('/apistore/operation',operationRoutes)
        this.app.use('/apistore/user', userRoutes);
        
        this.app.post('/apistore/user/verify',this.verifyToken,(req:any,res:any)=>{
            jwt.verify(req.token,'secretkey',(error:any,authData:any)=>{
                if(error){
                    res.sendStatus(403);
                }else{
                    res.json({
                        mensaje:"Post fue creado",
                        authData:authData
                    })
                }
            })
        })
        this.app.use('/apistore/message',messageRoutes);
        
    }
    
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
        
    }
    
    verifyToken(req:any,res:any,next:any){
        const bearerHeader=req.headers['authorization'];
        if(typeof bearerHeader!=='undefined'){
            const bearerToken=bearerHeader.split(" ")[1];
            req.token=bearerToken;
            next();
        }else{
            res.sendStatus(403);
        }
    }
}


const server = new Server();
server.start();