import express  from 'express';
import {obtenerPacientes,nuevoPaciente,obtenerPaciente,actualizarPaciente,eliminarPaciente} from '../controllers/pacienteControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(checkAuth,obtenerPacientes)
    .post(checkAuth,nuevoPaciente);

router.route('/:id')
    .get(checkAuth,obtenerPaciente)
    .put(checkAuth,actualizarPaciente)
    .delete(checkAuth,eliminarPaciente);

export default router;