module.exports = (sequelize, DataTypes) => {
  const Alojamento = sequelize.define("Alojamento", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    
    titulo: {                  // 👈 ESTE É O CORRETO, NÃO "nome"
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    },
    localizacao: {
      type: DataTypes.STRING
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2)
    },
    tipo: {
      type: DataTypes.ENUM("quarto", "apartamento", "outro")
    },
    comodidades: {
      type: DataTypes.STRING
    },
    facilitadorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "alojamentos",   // nome real da tabela na BD
    freezeTableName: true,
    timestamps: false           // adiciona true se tiveres createdAt/updatedAt
  });

  return Alojamento;
};
