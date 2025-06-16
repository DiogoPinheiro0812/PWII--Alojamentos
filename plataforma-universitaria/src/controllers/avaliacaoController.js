const { Avaliacao, Alojamento } = require("../models");

exports.criarAvaliacao = async (req, res) => {
  try {
    const novaAvaliacao = await Avaliacao.create(req.body);
    res.status(201).json(novaAvaliacao);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ mensagem: "Erro ao criar avaliação" });
  }
};

exports.listarAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      include: [
        {
          model: Alojamento,
          as: "alojamento"
        }
      ]
    });
    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error("Erro ao listar avaliações:", error);
    res.status(500).json({ mensagem: "Erro ao listar avaliações" });
  }
};

exports.listarAvaliacoesPorAlojamento = async (req, res) => {
  try {
    const { alojamentoId } = req.params;

    const avaliacoes = await Avaliacao.findAll({
      where: { alojamentoId },
      include: [
        {
          model: Alojamento,
          as: "alojamento"
        }
      ]
    });

    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error("Erro ao buscar avaliações por alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao buscar avaliações por alojamento" });
  }
};
