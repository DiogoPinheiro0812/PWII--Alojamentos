// controllers/eventoController.js
const { Evento } = require("../models");

exports.criarEvento = async (req, res) => {
  try {
    const novoEvento = await Evento.create(req.body);
    res.status(201).json(novoEvento);
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).json({ mensagem: "Erro ao criar evento" });
  }
};

exports.listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.status(200).json(eventos);
  } catch (error) {
    console.error("Erro ao listar eventos:", error);
    res.status(500).json({ mensagem: "Erro ao listar eventos" });
  }
};

exports.obterEventoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ mensagem: "Evento não encontrado" });
    }
    res.status(200).json(evento);
  } catch (error) {
    console.error("Erro ao obter evento:", error);
    res.status(500).json({ mensagem: "Erro ao obter evento" });
  }
};

exports.atualizarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Evento.update(req.body, { where: { id } });
    if (!atualizado) {
      return res.status(404).json({ mensagem: "Evento não encontrado" });
    }
    res.status(200).json({ mensagem: "Evento atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar evento" });
  }
};

exports.removerEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const apagado = await Evento.destroy({ where: { id } });
    if (!apagado) {
      return res.status(404).json({ mensagem: "Evento não encontrado" });
    }
    res.status(200).json({ mensagem: "Evento removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover evento:", error);
    res.status(500).json({ mensagem: "Erro ao remover evento" });
  }
};