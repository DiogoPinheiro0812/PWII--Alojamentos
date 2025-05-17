// controllers/notificacaoController.js
const { Notificacao } = require("../models");

exports.listarNotificacoesPorUtilizador = async (req, res) => {
  try {
    const { utilizadorId } = req.params;
    const notificacoes = await Notificacao.findAll({
      where: { utilizadorId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(notificacoes);
  } catch (error) {
    console.error("Erro ao listar notificações:", error);
    res.status(500).json({ mensagem: "Erro ao listar notificações" });
  }
};

exports.marcarNotificacaoComoLida = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Notificacao.update(
      { lida: true },
      { where: { id } }
    );
    if (!atualizado) {
      return res.status(404).json({ mensagem: "Notificação não encontrada" });
    }
    res.status(200).json({ mensagem: "Notificação marcada como lida" });
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar notificação" });
  }
};
