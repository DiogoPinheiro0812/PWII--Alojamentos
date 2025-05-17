// controllers/reservaController.js
const { Reserva, HistoricoReserva, Alojamento, Utilizador } = require("../models");
const { Op } = require("sequelize");

exports.criarReserva = async (req, res) => {
  try {
    const { dataInicio, dataFim, utilizadorId, alojamentoId } = req.body;

    const reservasExistentes = await Reserva.findAll({
      where: {
        alojamentoId,
        dataInicio: { [Op.lt]: dataFim },
        dataFim: { [Op.gt]: dataInicio }
      }
    });

    if (reservasExistentes.length > 0) {
      return res.status(409).json({ mensagem: "O alojamento já está reservado nesse intervalo de datas." });
    }

    const novaReserva = await Reserva.create({ dataInicio, dataFim, utilizadorId, alojamentoId });

    await HistoricoReserva.create({ reservaId: novaReserva.id, acao: "Criada" });

    res.status(201).json(novaReserva);
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ mensagem: "Erro ao criar reserva" });
  }
};

exports.listarReservasPorUtilizador = async (req, res) => {
  try {
    const { utilizadorId } = req.params;
    const reservas = await Reserva.findAll({ where: { utilizadorId } });
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    res.status(500).json({ mensagem: "Erro ao listar reservas" });
  }
};

exports.cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ mensagem: "Reserva não encontrada" });
    }

    await HistoricoReserva.create({ reservaId: reserva.id, acao: "Cancelada" });
    await reserva.destroy();

    res.status(200).json({ mensagem: "Reserva cancelada com sucesso" });
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    res.status(500).json({ mensagem: "Erro ao cancelar reserva" });
  }
};
