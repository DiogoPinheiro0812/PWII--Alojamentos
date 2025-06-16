// HistoricoReserva.js
module.exports = (sequelize, DataTypes) => {
  const HistoricoReserva = sequelize.define("HistoricoReserva", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dataReserva: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    utilizadorId: {
      type: DataTypes.CHAR(36),   // alterado para CHAR(36) para alinhar com reserva
      allowNull: false
    },
    alojamentoId: {
      type: DataTypes.CHAR(36),   // alterado para CHAR(36)
      allowNull: false
    }
  }, {
    tableName: "historico_reservas",
    freezeTableName: true,
    timestamps: false
  });

  HistoricoReserva.associate = (models) => {
    HistoricoReserva.belongsTo(models.Utilizador, { foreignKey: "utilizadorId" });
    HistoricoReserva.belongsTo(models.Alojamento, { foreignKey: "alojamentoId" });
  };

  return HistoricoReserva;
};
