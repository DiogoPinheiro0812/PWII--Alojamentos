module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define("Avaliacao", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    alojamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estudanteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pontuacao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comentario: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: "avaliacoes",
    freezeTableName: true,
    timestamps: false
  });

  // ✅ Aqui define a associação
  Avaliacao.associate = (models) => {
    Avaliacao.belongsTo(models.Alojamento, {
      foreignKey: "alojamentoId",
      as: "alojamento"
    });
  };

  return Avaliacao;
};
