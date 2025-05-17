// models/notificacao.js
module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define("Notificacao", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    utilizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assunto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Notificacao.associate = (models) => {
    Notificacao.belongsTo(models.Utilizador, {
      foreignKey: "utilizadorId",
      onDelete: "CASCADE"
    });
  };

  return Notificacao;
};
