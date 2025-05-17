// models/evento.js
module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define("Evento", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dataFim: {
      type: DataTypes.DATE,
      allowNull: false
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Evento.associate = (models) => {
    Evento.belongsToMany(models.Utilizador, {
      through: models.ParticipacaoEvento,
      foreignKey: "eventoId"
    });
  };

  return Evento;
};
