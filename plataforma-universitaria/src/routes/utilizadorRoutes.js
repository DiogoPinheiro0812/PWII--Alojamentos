// routes/utilizadorRoutes.js
const express = require("express");
const routerUtilizador = express.Router();
const utilizadorController = require("../controllers/utilizadorController");

routerUtilizador.post("/utilizadores", utilizadorController.criarUtilizador);
routerUtilizador.get("/utilizadores", utilizadorController.listarUtilizadores);
routerUtilizador.get("/utilizadores/:id", utilizadorController.obterUtilizadorPorId);
routerUtilizador.put("/utilizadores/:id", utilizadorController.atualizarUtilizador);
routerUtilizador.delete("/utilizadores/:id", utilizadorController.removerUtilizador);

module.exports = routerUtilizador;