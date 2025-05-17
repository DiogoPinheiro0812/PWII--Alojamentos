// routes/eventoRoutes.js
const express = require("express");
const routerEvento = express.Router();
const eventoController = require("../controllers/eventoController");

routerEvento.post("/eventos", eventoController.criarEvento);
routerEvento.get("/eventos", eventoController.listarEventos);
routerEvento.get("/eventos/:id", eventoController.obterEventoPorId);
routerEvento.put("/eventos/:id", eventoController.atualizarEvento);
routerEvento.delete("/eventos/:id", eventoController.removerEvento);

module.exports = routerEvento;