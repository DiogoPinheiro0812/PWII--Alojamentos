const { ParticipacaoEvento, Evento, Utilizador } = require("../models");

exports.registarParticipacao = async (req, res) => {
  try {
    const { eventoId, utilizadorId } = req.body;

    const participacaoExistente = await ParticipacaoEvento.findOne({
      where: { eventoId, utilizadorId }
    });

    if (participacaoExistente) {
      return res.status(409).json({ mensagem: "Participação já registada." });
    }

    const novaParticipacao = await ParticipacaoEvento.create({ eventoId, utilizadorId });
    res.status(201).json(novaParticipacao);
  } catch (error) {
    console.error("Erro ao registar participação:", error);
    res.status(500).json({ mensagem: "Erro ao registar participação" });
  }
};

exports.listarParticipacoesPorEvento = async (req, res) => {
  try {
    const { eventoId } = req.params;
    const participacoes = await ParticipacaoEvento.findAll({ where: { eventoId } });
    res.status(200).json(participacoes);
  } catch (error) {
    console.error("Erro ao listar participações:", error);
    res.status(500).json({ mensagem: "Erro ao listar participações" });
  }
};

exports.listarParticipacoesPorUtilizador = async (req, res) => {
  try {
    const { utilizadorId } = req.params;
    const participacoes = await ParticipacaoEvento.findAll({ where: { utilizadorId } });
    res.status(200).json(participacoes);
  } catch (error) {
    console.error("Erro ao listar participações:", error);
    res.status(500).json({ mensagem: "Erro ao listar participações" });
  }
};

exports.removerParticipacao = async (req, res) => {
  try {
    const { eventoId, utilizadorId } = req.body;
    const participacao = await ParticipacaoEvento.findOne({
      where: { eventoId, utilizadorId }
    });
    if (!participacao) {
      return res.status(404).json({ mensagem: "Participação não encontrada" });
    }
    await participacao.destroy();
    res.status(200).json({ mensagem: "Participação removida com sucesso" });
  } catch (error) {
    console.error("Erro ao remover participação:", error);
    res.status(500).json({ mensagem: "Erro ao remover participação" });
  }
};
