import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOvidePassword.js";

const registrar = async (req,res)  => {
    console.log(req.body);
    try {
        const {email,nombre} = req.body;

        //Revisar si un usario esta duplicado
        const existeUsario = await Veterinario.findOne({email});

        if (existeUsario) {
            const error = new Error('Usuario ya registrado');
            return res.status(400).json({msg:error.message});
        }

        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        //Enviar un email de confirmacion
        emailRegistro({email,nombre,token:veterinarioGuardado.token});
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
};

const perfil =  (req,res) => {
    const {veterinario} = req;
    res.json(veterinario);
};

const confirmar = async (req,res) => {
    const {token} = req.params;
    
    const usuarioConfirmar = await Veterinario.findOne({token});
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({msg:error.message});
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg:'Usuario confirmado'});
    } catch (error) {
        console.log(error);
    }
}


const autenticar = async (req,res) =>{
    const {email,password} = req.body;
    
    //Comprobar si el usuario existe 
    const usuario = await Veterinario.findOne({email});
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(403).json({msg:error.message});
    }
    
    //Revisar el password
    if (await usuario.comprobarPassword(password)) {
        //Autenticar al usuario
        usuario.token = generarJWT(usuario._id)
        res.json({_id:usuario._id,token:usuario.token,nombre:usuario.nombre,email:usuario.email});
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg:error.message})
    }

    //Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg:error.message});
    }

} 

const olvidePassword = async (req,res) =>{
    const {email} = req.body;

    const existeVeterinario = await Veterinario.findOne({email});
    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg:error.message});
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        //Enviar un email de restablecer
        emailOlvidePassword({email,nombre:existeVeterinario.nombre,token:existeVeterinario.token});
        res.json({msg:"Hemos enviado un email con las instrucciones"});
    } catch (error) {
        console.log(error);
    }
}
const comprobarToken = async (req,res) =>{
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if(tokenValido){
        //Token valido el usuario existe
        res.json({msg:"Token valido el usuario existe"});
    }else{
        const error = new Error('Token no valido');
        return res.status(400).json({msg:error.message});
    }
}
const nuevoPassword = async (req,res) =>{
    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message});
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg:"Password modificado correctamente"});
    } catch (error) {
        console.log(error);
    }
}

const actualizarPerfil = async (req,res) =>{
    const veterinario = await Veterinario.findById(req.params.id);
    if (!veterinario) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({msg:error.message});
    }
    const {email} = req.body;
    if (email !== veterinario.email) {
        const existeVeterinario = await Veterinario.findOne({email});
        if (existeVeterinario) {
            const error = new Error('El email ya esta registrado');
            return res.status(400).json({msg:error.message});
        }
    }

    try {
        const {nombre,email,telefono,web} = req.body;
        veterinario.nombre = nombre;
        veterinario.email = email;
        veterinario.telefono = telefono;
        veterinario.web = web;
        const veterinarioActualizado =  await veterinario.save();
        res.json(veterinarioActualizado);
    } catch (error) {
        console.log(error);
    }
}

const actualizarPassword = async (req,res) =>{
    const {password,passwordNuevo} = req.body;
    const {_id} = req.veterinario;
    //Comprobar si el usuario existe

    const veterinario = await Veterinario.findById(_id);
    if (!veterinario) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({msg:error.message});
    }

    //Comprobar el password
    if (await veterinario.comprobarPassword(password)) {
        //Almacenar el nuevo password
        veterinario.password = passwordNuevo;
        await veterinario.save();
        res.json({msg:'Password actualizado correctamente'});
    }else{
        const error = new Error('El password actual es incorrecto');
        return res.status(400).json({msg:error.message});
    }

    
}



export {registrar,autenticar,confirmar,perfil,olvidePassword,comprobarToken,nuevoPassword,actualizarPerfil,actualizarPassword};