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

    const novaReserva = await Reserva.create({
      dataInicio,
      dataFim,
      utilizadorId,
      alojamentoId
    });

    await HistoricoReserva.create({
      utilizadorId,
      alojamentoId,
      dataReserva: new Date(),
      estado: "Criada"
    });

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

    await HistoricoReserva.create({
      dataReserva: new Date(),
      estado: "Cancelada",
      utilizadorId: reserva.utilizadorId,
      alojamentoId: reserva.alojamentoId
    });

    await reserva.destroy();

    res.status(200).json({ mensagem: "Reserva cancelada com sucesso" });
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    res.status(500).json({ mensagem: "Erro ao cancelar reserva" });
  }
};



exports.listarTodasReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Erro ao listar todas as reservas:", error);
    res.status(500).json({ mensagem: "Erro ao listar todas as reservas" });
  }
};
exports.atualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ mensagem: "Reserva não encontrada" });
    }

    reserva.status = status;
    await reserva.save();

    if (status === "concluida") {
      await HistoricoReserva.create({
        dataReserva: new Date(),
        estado: "concluida",
        utilizadorId: reserva.utilizadorId,
        alojamentoId: reserva.alojamentoId
      });
    }

    res.status(200).json({ mensagem: "Reserva atualizada com sucesso", reserva });
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar reserva" });
  }
};


exports.moverReservasParaHistorico = async (req, res) => {
  try {
    await moverReservasConcluidasParaHistorico();
    res.status(200).json({ mensagem: "Reservas concluídas movidas para histórico com sucesso." });
  } catch (error) {
    console.error("Erro ao mover reservas:", error);
    res.status(500).json({ mensagem: "Erro ao mover reservas para histórico." });
  }
};
