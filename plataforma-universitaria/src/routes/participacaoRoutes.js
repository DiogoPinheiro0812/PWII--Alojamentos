const express = require("express");
const routerParticipacao = express.Router();
const participacaoController = require("../controllers/participacaoController");

routerParticipacao.post("/participacoes", participacaoController.registarParticipacao);
routerParticipacao.get("/participacoes/utilizador/:utilizadorId", participacaoController.listarParticipacoesPorUtilizador);
routerParticipacao.delete("/participacoes", participacaoController.removerParticipacao);

module.exports = routerParticipacao;
