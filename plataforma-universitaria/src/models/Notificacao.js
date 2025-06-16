// models/notificacao.js

module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define("Notificacao", {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true
    },
    utilizadorId: {
      type: DataTypes.STRING(36),
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
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    
    lida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'notificacoes',
    freezeTableName: true,
    timestamps: false,
  });

  Notificacao.associate = (models) => {
    Notificacao.belongsTo(models.Utilizador, {
      foreignKey: "utilizadorId",
      onDelete: "CASCADE"
    });
  };

  return Notificacao;
};
