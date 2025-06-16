// routes/alojamentoRoutes.js
const express = require("express");
const routerAlojamento = express.Router();
const alojamentoController = require("../controllers/alojamentoController");

routerAlojamento.post("/", alojamentoController.criarAlojamento);
routerAlojamento.get("/", alojamentoController.listarAlojamentos);
routerAlojamento.get("/:id", alojamentoController.obterAlojamentoPorId);
routerAlojamento.put("/:id", alojamentoController.atualizarAlojamento);
routerAlojamento.delete("/:id", alojamentoController.removerAlojamento);

module.exports = routerAlojamento;