const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
  console.log("request", req.uid, req.params.de);
  const miId = req.uid;
  const mensajesDe = req.params.de;
  const last30 = await Mensaje.find({
    $or: [
      { de: miId, para: mensajesDe },
      { de: mensajesDe, mara: miId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    mensajes: last30,
  });
};

module.exports = {
  obtenerChat,
};
