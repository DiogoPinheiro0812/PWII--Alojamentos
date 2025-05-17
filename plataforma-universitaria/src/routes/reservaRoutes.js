// routes/reservaRoutes.js
const express = require("express");
const routerReserva = express.Router();
const reservaController = require("../controllers/reservaController");

routerReserva.post("/reservas", reservaController.criarReserva);
routerReserva.get("/reservas/utilizador/:utilizadorId", reservaController.listarReservasPorUtilizador);
routerReserva.delete("/reservas/:id", reservaController.cancelarReserva);

module.exports = routerReserva;