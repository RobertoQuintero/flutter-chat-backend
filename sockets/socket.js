const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Héroes del silencio"));
bands.addBand(new Band("Metallica"));

io.on("connection", (client) => {
  console.log("cliente conectado");
  client.emit("active-bands", bands.getBands());
  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje ", payload);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });
  client.on("emitir-mensaje", (payload) => {
    console.log(payload);
    client.broadcast.emit("nuevo-mensaje", payload);
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    const band = new Band();
    band.name = payload.name;
    bands.addBand(band);
    io.emit("active-bands", bands.getBands());
  });
  client.on("delete-band", (payload) => {
    console.log(payload.id);
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});
