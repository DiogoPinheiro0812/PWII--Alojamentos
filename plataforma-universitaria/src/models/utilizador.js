const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define("Utilizador", {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4
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
    perfil: {
      type: DataTypes.ENUM("estudante", "facilitador", "admin"),
      allowNull: false
    }
  }, {
    tableName: "utilizadores",
    freezeTableName: true,
    timestamps: false
  });

  return Utilizador;
};
