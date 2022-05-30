import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacientesRouter.js';

import cors  from 'cors';

//crear el servidor
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

//Conectar la db
conectarDB();

//Habilitar cors
const dominiosPermitidos = [process.env.FRONT_URL];
const corsOption = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}
app.use(cors(corsOption));


//Habilitar el req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Habilitar routing
app.use('/api/veterinarios',veterinarioRoutes);
app.use('/api/pacientes',pacienteRoutes)


// puerto y arrancar el servidor
app.listen(PORT,()=>{
    console.log('Servidor funcionando');
});