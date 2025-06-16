module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define("Evento", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  // Gera UUID automaticamente
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
    data: {
      type: DataTypes.DATE,
      allowNull: false
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facilitadorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "eventos",
    freezeTableName: true,
    timestamps: false
  });

  return Evento;
};
