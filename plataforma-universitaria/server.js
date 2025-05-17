const express = require('express');
const app = express();
const alojamentoRoutes = require("./src/routes/alojamentoRoutes.js");
const { sequelize } = require("./src/models");
const reservaRoutes = require("./src/routes/reservaRoutes");
const routerParticipacao = require("./src/routes/participacaoRoutes");
const notificacaoRoutes = require("./src/routes/notificacaoRoutes");







app.use(express.json());
app.get('/utilizadores', (req, res) => {
  // Exemplo de lógica para listar os utilizadores
  Utilizador.findAll()
      .then(utilizadores => res.json(utilizadores))
      .catch(err => res.status(500).send('Erro ao buscar utilizadores: ' + err));
});
app.use("/notificacoes", notificacaoRoutes);
app.use("/api", routerParticipacao);
app.use("/api/alojamentos", alojamentoRoutes);
app.use("/api/reservas", reservaRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida.');
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados:', err);
    });
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor a correr em http://localhost:3000");
  });
});
