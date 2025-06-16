const express = require("express");
const routerHistorico = express.Router();
const historicoReservaController = require("../controllers/historicoReservaController");

routerHistorico.post("/", historicoReservaController.criarHistoricoReserva);
routerHistorico.get("/utilizador/:utilizadorId", historicoReservaController.listarHistoricoPorUtilizador);

module.exports = routerHistorico;
