// models/participacaoEvento.js
module.exports = (sequelize, DataTypes) => {
  const ParticipacaoEvento = sequelize.define("ParticipacaoEvento", {
    eventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    utilizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  });

  ParticipacaoEvento.associate = (models) => {
    ParticipacaoEvento.belongsTo(models.Evento, {
      foreignKey: "eventoId",
      onDelete: "CASCADE"
    });
    ParticipacaoEvento.belongsTo(models.Utilizador, {
      foreignKey: "utilizadorId",
      onDelete: "CASCADE"
    });
  };

  return ParticipacaoEvento;
};
