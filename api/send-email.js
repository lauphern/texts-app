const transporter = require("./send-email-config/config");

module.exports = (req, res) => {
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Access-Control-Allow-Origin", "*");

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Nuevo mensaje en su web cristina-escritora",
    text: `Recibiste un mensaje de ${req.body.name}, con email ${req.body.email}. Ha dejado el siguiente mensaje: ${req.body.message}`,
    html: `<h1>Recibiste un mensaje de ${req.body.name}, con email ${req.body.email}. </h1><br> <p>Ha dejado el siguiente mensaje:</p><br> <p>${req.body.message}</p>`,
    disableFileAccess: true,
    disableUrlAccess: true,
  };

  transporter
    .sendMail(mailOptions)
    .then(() =>
      res.json({
        success: true,
        message: "¡Gracias por su mensaje!",
      })
    )
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "¡Vaya! Algo salió mal.",
      });
    });
};
