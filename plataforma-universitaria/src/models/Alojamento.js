// models/alojamento.js
module.exports = (sequelize, DataTypes) => {
  const Alojamento = sequelize.define("Alojamento", {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    localizacao: DataTypes.STRING,
    capacidade: DataTypes.INTEGER
  });
  return Alojamento;
};