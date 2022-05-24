

module.exports = function () {

    //Agrega nuevos pacientes via post
    router.post('/pacientes',pacienteController.nuevoCliente);

    //Obtiene todos los registros de pacientes en la BD
    router.get('/pacientes',pacienteController.obtenerPacientes);

    //Obtener paciente en especifico
    router.get('/pacientes/:id',pacienteController.obtenerPaciente);

    //Actualizar un registro
    router.put('/pacientes/:id',pacienteController.actualizarPaciente)

     //Eliminar un registro
     router.delete('/pacientes/:id',pacienteController.eliminarPaciente)
    return router;
}