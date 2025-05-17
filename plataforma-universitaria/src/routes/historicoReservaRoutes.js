const express = require("express");
const routerHistorico = express.Router();
const historicoReservaController = require("../controllers/historicoReservaController");

routerHistorico.post("/historico-reservas", historicoReservaController.criarHistoricoReserva);
routerHistorico.get("/historico-reservas/utilizador/:utilizadorId", historicoReservaController.listarHistoricoPorUtilizador);

module.exports = routerHistorico;
