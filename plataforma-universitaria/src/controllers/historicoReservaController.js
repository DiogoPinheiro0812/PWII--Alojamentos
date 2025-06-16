const { HistoricoReserva } = require("../models");

exports.criarHistoricoReserva = async (req, res) => {
  try {
    const { utilizadorId, alojamentoId, dataReserva, estado } = req.body;

    const novaEntrada = await HistoricoReserva.create({
      utilizadorId,
      alojamentoId,
      dataReserva,
      estado
    });

    res.status(201).json(novaEntrada);
  } catch (error) {
    console.error("Erro ao criar histórico de reserva:", error);
    res.status(500).json({ mensagem: "Erro ao criar histórico de reserva" });
  }
};

exports.listarHistoricoPorUtilizador = async (req, res) => {
  try {
    const { utilizadorId } = req.params;

    const historico = await HistoricoReserva.findAll({
      where: { utilizadorId },
      order: [["dataReserva", "DESC"]]
    });

    res.status(200).json(historico);
  } catch (error) {
    console.error("Erro ao listar histórico:", error);
    res.status(500).json({ mensagem: "Erro ao listar histórico de reservas" });
  }
};