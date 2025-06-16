const { Utilizador, Avaliacao, Reserva, HistoricoReserva, Notificacao } = require("../models");

exports.criarUtilizador = async (req, res) => {
  try {
    const novoUtilizador = await Utilizador.create(req.body);
    res.status(201).json(novoUtilizador);
  } catch (error) {
    console.error("Erro ao criar utilizador:", error);
    res.status(500).json({ mensagem: "Erro ao criar utilizador" });
  }
};

exports.listarUtilizadores = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll();
    res.status(200).json(utilizadores);
  } catch (error) {
    console.error("Erro ao listar utilizadores:", error);
    res.status(500).json({ mensagem: "Erro ao listar utilizadores" });
  }
};

exports.obterUtilizadorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const utilizador = await Utilizador.findByPk(id);
    if (!utilizador) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado" });
    }
    res.status(200).json(utilizador);
  } catch (error) {
    console.error("Erro ao obter utilizador:", error);
    res.status(500).json({ mensagem: "Erro ao obter utilizador" });
  }
};

exports.atualizarUtilizador = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Utilizador.update(req.body, { where: { id } });
    if (!atualizado) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado" });
    }
    res.status(200).json({ mensagem: "Utilizador atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar utilizador:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar utilizador" });
  }
};

exports.removerUtilizador = async (req, res) => {
  try {
    const { id } = req.params;

    // ❗ Eliminar dependências primeiro
    await Avaliacao.destroy({ where: { estudanteId: id } });
    await Reserva.destroy({ where: { utilizadorId: id } });
    await HistoricoReserva.destroy({ where: { utilizadorId: id } });
    await Notificacao.destroy({ where: { utilizadorId: id } });

    const apagado = await Utilizador.destroy({ where: { id } });

    if (!apagado) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado" });
    }

    res.status(200).json({ mensagem: "Utilizador removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover utilizador:", error);
    res.status(500).json({ mensagem: "Erro ao remover utilizador" });
  }
};
