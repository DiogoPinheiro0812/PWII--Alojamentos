const express = require("express");
const routerParticipacao = express.Router();
const participacaoController = require("../controllers/participacaoController");

routerParticipacao.post("/participacoes", participacaoController.inscreverNoEvento);
routerParticipacao.get("/participacoes/utilizador/:utilizadorId", participacaoController.listarParticipacoesPorUtilizador);
routerParticipacao.delete("/participacoes/:id", participacaoController.cancelarParticipacao);

module.exports = routerParticipacao;
