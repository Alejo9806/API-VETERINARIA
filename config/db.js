import mongoose from 'mongoose';

//Conectar a mongodb
const conectarDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MonoDB conectado en: ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;