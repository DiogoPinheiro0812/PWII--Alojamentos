module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define("Reserva", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Gera automaticamente o UUID
      primaryKey: true,
      allowNull: false
    },
    
    alojamentoId: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    utilizadorId: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pendente', 'aceite', 'rejeitado', 'concluida'), // atualizado
      defaultValue: 'pendente',
      allowNull: false
    }
  }, {
    tableName: 'reservas',
    timestamps: false
  });

  // Hook automático para criar histórico
  Reserva.addHook('afterUpdate', async (reserva, options) => {
    if (reserva.status === 'concluída') {
      const { HistoricoReserva } = require('./index');
      try {
        await HistoricoReserva.create({
          dataReserva: new Date(),
          estado: 'concluída',
          utilizadorId: reserva.utilizadorId,
          alojamentoId: reserva.alojamentoId
        });
        console.log(`✅ Reserva ${reserva.id} movida para histórico.`);
      } catch (error) {
        console.error('❌ Erro ao adicionar reserva ao histórico:', error);
      }
    }
  });

  return Reserva;
};
