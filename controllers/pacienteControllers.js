import Paciente from '../models/Paciente.js';

//Cuando se crea un nuevo cliente
const nuevoPaciente = async  (req,res,next) =>{
    //TODO : Insertar en la base de datos
    //Crear objeto de paciente con datos de req.body
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        await paciente.save();
        res.json({mensaje:'El paciente se agrego correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
    
 

}

//Obtiene todos los pacientes
const obtenerPacientes = async (req,res) =>{

    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.json(pacientes);

}

//obtener paciente en especifico
const obtenerPaciente = async (req,res,next) => {
    try {
        const {id} = req.params;
        const paciente = await Paciente.findById(id);
    
        if (!paciente) {
            return res.status(404).json({msg:"No encontrado"});
        }
    
        if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
            return res.json({msg:"Accion no valida"});
        }
    
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }

}

//Actualizar paciente por id
const actualizarPaciente = async (req,res,next) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
       return res.status(404).json({msg:"No encontrado"});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({msg:"Accion no valida"});
    }
   
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();        
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar paciente por id
const eliminarPaciente = async (req,res,next) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
       return res.status(404).json({msg:"No encontrado"});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({msg:"Accion no valida"});
    }
    try {
        await paciente.deleteOne();
        res.json({mensaje:'El paciente fue eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

export {obtenerPacientes,nuevoPaciente,obtenerPaciente,actualizarPaciente,eliminarPaciente};