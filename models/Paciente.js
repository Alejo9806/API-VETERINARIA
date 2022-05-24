import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    nombre:{
        type: String,
        required:true,
        trim:true,
    },
    propietario:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true
    },
    fecha:{
        type: Date,
        trim: true,
        default: Date.now(),
    },
    sintomas:{
        type: String,
        trim: true
    },
    veterinario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Veterinario"
    }
    
},{
    timestamps:true,
});

const paciente = mongoose.model('Paciente',pacienteSchema);

export default paciente;