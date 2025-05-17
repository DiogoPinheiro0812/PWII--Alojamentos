// routes/alojamentoRoutes.js
const express = require("express");
const routerAlojamento = express.Router();
const alojamentoController = require("../controllers/alojamentoController");

routerAlojamento.post("/alojamentos", alojamentoController.criarAlojamento);
routerAlojamento.get("/alojamentos", alojamentoController.listarAlojamentos);
routerAlojamento.get("/alojamentos/:id", alojamentoController.obterAlojamentoPorId);
routerAlojamento.put("/alojamentos/:id", alojamentoController.atualizarAlojamento);
routerAlojamento.delete("/alojamentos/:id", alojamentoController.removerAlojamento);

module.exports = routerAlojamento;