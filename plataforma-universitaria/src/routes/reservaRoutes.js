// routes/reservaRoutes.js
const express = require("express");
const routerReserva = express.Router();
const reservaController = require("../controllers/reservaController");

routerReserva.post("/", reservaController.criarReserva);
routerReserva.get("/", reservaController.listarTodasReservas); 
routerReserva.get("/utilizador/:utilizadorId", reservaController.listarReservasPorUtilizador);
routerReserva.put("/:id", reservaController.atualizarReserva); // 👈 nova rota
routerReserva.delete("/:id", reservaController.cancelarReserva);

module.exports = routerReserva;