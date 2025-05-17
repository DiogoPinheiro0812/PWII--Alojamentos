// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("basedados", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.HistoricoReserva = require("./historicoReserva")(sequelize, DataTypes);
db.Utilizador = require("./utilizador")(sequelize, DataTypes);
db.Evento = require("./Evento")(sequelize, DataTypes);
db.Notificacao = require("./Notificacao")(sequelize, DataTypes);
db.ParticipacaoEvento = require("./participacaoEvento")(sequelize, DataTypes);

// Aplicar associações
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
