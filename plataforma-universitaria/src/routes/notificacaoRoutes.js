// routes/notificacaoRoutes.js
const express = require("express");
const routerNotificacao = express.Router();
const notificacaoController = require("../controllers/notificacaoController");

routerNotificacao.get("/notificacoes/:utilizadorId", notificacaoController.listarNotificacoesPorUtilizador);
routerNotificacao.patch("/notificacoes/:id", notificacaoController.marcarNotificacaoComoLida);

module.exports = routerNotificacao;
