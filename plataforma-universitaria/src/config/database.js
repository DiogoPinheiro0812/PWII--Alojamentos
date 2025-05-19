const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "plataforma_alojamentos",        // Substitua pelo nome do banco de dados
  "root",                 // Substitua pelo usuário do banco de dados
  "123456789",            // Substitua pela senha do usuário
  {
    host: "localhost",     // Ou outro host se necessário
    dialect: "mysql",
    logging: false,
  }
);

// Testar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = sequelize;
