const express = require("express");
const router = express.Router();
const avaliacaoController = require("../controllers/avaliacaoController");

router.post("/", avaliacaoController.criarAvaliacao);
router.get("/", avaliacaoController.listarAvaliacoes);
router.get("/alojamento/:alojamentoId", avaliacaoController.listarAvaliacoesPorAlojamento);

module.exports = router;
