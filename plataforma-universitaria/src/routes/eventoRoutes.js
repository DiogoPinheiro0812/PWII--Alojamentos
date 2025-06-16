// routes/eventoRoutes.js
const express = require("express");
const routerEvento = express.Router();
const eventoController = require("../controllers/eventoController");

routerEvento.post("/", eventoController.criarEvento);
routerEvento.get("/", eventoController.listarEventos);
routerEvento.get("/:id", eventoController.obterEventoPorId);
routerEvento.put("/:id", eventoController.atualizarEvento);
routerEvento.delete("/:id", eventoController.removerEvento);

module.exports = routerEvento;
