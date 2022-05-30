import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
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
        text: `Restablecer tu password`,
        html: `<h1>Hola ${nombre}, para restablecer tu password en APV, por favor haz click en el siguiente enlace:</h1>
                <a href="${process.env.FRONT_URL}/olvide-password/${token}">Restablecer password</a>
                <p>Si tu no creaste esta cuenta puedes ignorar este mensaje </p>`
        });
        console.log("Mensaje de informacion",info);

}
export default emailOlvidePassword;