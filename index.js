import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
// import routes  from './routes/index.js';
import bodyParser  from 'body-parser';
import cors  from 'cors';

//crear el servidor
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

//Conectar la db
conectarDB();

//Habilitar cors
app.use(cors());


//Habilitar el bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// //Habilitar routing
// app.use('/',routes());


// puerto y arrancar el servidor
app.listen(PORT,()=>{
    console.log('Servidor funcionando');
});