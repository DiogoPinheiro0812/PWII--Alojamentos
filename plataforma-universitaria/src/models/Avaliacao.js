module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define("Avaliacao", {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true
    },
    alojamentoId: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    estudanteId: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    pontuacao: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
    comentario: DataTypes.TEXT
  });

  Avaliacao.associate = (models) => {
    Avaliacao.belongsTo(models.Utilizador, { foreignKey: "estudanteId", as: "estudante" });
    Avaliacao.belongsTo(models.Alojamento, { foreignKey: "alojamentoId" });
  };

  return Avaliacao;
};
