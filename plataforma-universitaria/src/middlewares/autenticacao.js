// middlewares/autenticacao.js
const { Utilizador } = require("../models");

exports.verificarPermissaoReserva = async (req, res, next) => {
  try {
    const utilizadorId = req.body.utilizadorId;

    if (!utilizadorId) {
      return res.status(400).json({ mensagem: "ID do utilizador não fornecido." });
    }

    const utilizador = await Utilizador.findByPk(utilizadorId);

    if (!utilizador) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado." });
    }

    if (utilizador.papel !== "facilitador" && utilizador.papel !== "admin") {
      return res.status(403).json({ mensagem: "Apenas facilitadores ou administradores podem criar reservas." });
    }

    next();
  } catch (error) {
    console.error("Erro na verificação de permissão:", error);
    res.status(500).json({ mensagem: "Erro na verificação de permissão" });
  }
};
