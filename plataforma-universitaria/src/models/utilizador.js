// models/utilizador.js
module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define("Utilizador", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM("estudante", "facilitador", "admin"),
      allowNull: false
    }
  });

  Utilizador.associate = (models) => {
    Utilizador.belongsToMany(models.Evento, {
      through: models.ParticipacaoEvento,
      foreignKey: "utilizadorId"
    });

    Utilizador.hasMany(models.Notificacao, {
      foreignKey: "utilizadorId"
    });
  };

  return Utilizador;
};
