// models/reserva.js
module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define("Reserva", {
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE,
    utilizadorId: DataTypes.INTEGER,
    alojamentoId: DataTypes.INTEGER
  });
  return Reserva;
};