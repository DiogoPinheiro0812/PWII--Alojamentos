// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("plataforma_alojamentos", "root", "123456789", {
  host: "localhost",
  dialect: "mysql"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Utilizador = require("./utilizador")(sequelize, DataTypes);
db.Alojamento = require("./Alojamento")(sequelize, DataTypes); // este estava a faltar!
db.Evento = require("./Evento")(sequelize, DataTypes);
db.Notificacao = require("./Notificacao")(sequelize, DataTypes);
db.ParticipacaoEvento = require("./participacaoEvento")(sequelize, DataTypes);
db.HistoricoReserva = require("./historicoReserva")(sequelize, DataTypes);


// Aplicar associações
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
