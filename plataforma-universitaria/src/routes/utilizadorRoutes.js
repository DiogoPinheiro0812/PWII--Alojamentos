const express = require("express");
const router = express.Router();
const utilizadorController = require("../controllers/utilizadorController");

// Caminhos relativos ao prefixo /api/utilizadores
router.post("/", utilizadorController.criarUtilizador);
router.get("/", utilizadorController.listarUtilizadores);
router.get("/:id", utilizadorController.obterUtilizadorPorId);
router.put("/:id", utilizadorController.atualizarUtilizador);
router.delete("/:id", utilizadorController.removerUtilizador);

module.exports = router;
