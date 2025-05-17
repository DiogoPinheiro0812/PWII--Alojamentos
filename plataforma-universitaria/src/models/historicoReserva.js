module.exports = (sequelize, DataTypes) => {
  const HistoricoReserva = sequelize.define("HistoricoReserva", {
    dataReserva: DataTypes.DATE,
    estado: DataTypes.STRING // exemplo: "cancelada", "concluída", "pendente"
  });

  HistoricoReserva.associate = (models) => {
    HistoricoReserva.belongsTo(models.Utilizador, { foreignKey: "utilizadorId" });
    HistoricoReserva.belongsTo(models.Alojamento, { foreignKey: "alojamentoId" });
  };

  return HistoricoReserva;
};
