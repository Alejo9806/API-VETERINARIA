import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      console.log(datos);
      //Enviar el email
      const {email,nombre,token} = datos;

      const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        email: process.env.EMAIL_USER,
        to: email,
        subject: "Confirmacion de registro",
        text: `Hola ${nombre}, para confirmar tu registro en APV, por favor haz click en el siguiente enlace: http://localhost:3000/confirmar/${token}`,
        html: `<h1>Hola ${nombre}, para confirmar tu registro en APV, por favor haz click en el siguiente enlace:</h1>
                <a href="${process.env.FRONT_URL}/confirmar/${token}">Confirmar</a>
                <p>Si tu no creaste esta cuenta puedes ignorar este mensaje </p>`
        });
        console.log("Mensaje de informacion",info);

}
export default emailRegistro;