// controllers/alojamentoController.js
const { Alojamento } = require("../models");

exports.criarAlojamento = async (req, res) => {
  try {
    const novoAlojamento = await Alojamento.create(req.body);
    res.status(201).json(novoAlojamento);
  } catch (error) {
    console.error("Erro ao criar alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao criar alojamento" });
  }
};

exports.listarAlojamentos = async (req, res) => {
  try {
    const alojamentos = await Alojamento.findAll();
    res.status(200).json(alojamentos);
  } catch (error) {
    console.error("Erro ao listar alojamentos:", error);
    res.status(500).json({ mensagem: "Erro ao listar alojamentos" });
  }
};

exports.obterAlojamentoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const alojamento = await Alojamento.findByPk(id);
    if (!alojamento) {
      return res.status(404).json({ mensagem: "Alojamento não encontrado" });
    }
    res.status(200).json(alojamento);
  } catch (error) {
    console.error("Erro ao obter alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao obter alojamento" });
  }
};

exports.atualizarAlojamento = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Alojamento.update(req.body, { where: { id } });
    if (!atualizado) {
      return res.status(404).json({ mensagem: "Alojamento não encontrado" });
    }
    res.status(200).json({ mensagem: "Alojamento atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar alojamento" });
  }
};

exports.removerAlojamento = async (req, res) => {
  try {
    const { id } = req.params;
    const apagado = await Alojamento.destroy({ where: { id } });
    if (!apagado) {
      return res.status(404).json({ mensagem: "Alojamento não encontrado" });
    }
    res.status(200).json({ mensagem: "Alojamento removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao remover alojamento" });
  }
};
