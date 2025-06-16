const express = require("express");
const router = express.Router();
const notificacaoController = require("../controllers/notificacaoController");

// NÃO repetir "notificacoes" porque já vem de /api/notificacoes
router.get("/:utilizadorId", notificacaoController.listarNotificacoesPorUtilizador);
router.patch("/:id", notificacaoController.marcarNotificacaoComoLida);

module.exports = router;
