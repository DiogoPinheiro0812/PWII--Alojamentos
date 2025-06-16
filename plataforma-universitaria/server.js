const express = require('express');
const app = express();
const { sequelize } = require("./src/models");

// Importar todos os routers
const utilizadorRoutes = require("./src/routes/utilizadorRoutes");
const alojamentoRoutes = require("./src/routes/alojamentoRoutes");
const reservaRoutes = require("./src/routes/reservaRoutes");
const notificacaoRoutes = require("./src/routes/notificacaoRoutes");
const eventoRoutes = require("./src/routes/eventoRoutes");
const historicoRoutes = require("./src/routes/historicoReservaRoutes");
const avaliacaoRoutes = require("./src/routes/avaliacaoRoutes");



// Middleware para ler JSON
app.use(express.json());

// 🔗 Definir prefixo /api para organização
app.use("/api/utilizadores", utilizadorRoutes);
app.use("/api/alojamentos", alojamentoRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/notificacoes", notificacaoRoutes);
app.use("/api/eventos", eventoRoutes)
app.use("/api/historicoreservas", historicoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);

// Rota básica de teste
app.get("/", (req, res) => {
  res.send("API da Plataforma Universitária 🚀");
});

// 🧪 Teste de ligação à base de dados
sequelize.authenticate()
  .then(() => console.log("✅ Conexão com o banco de dados foi bem-sucedida."))
  .catch((err) => console.error("❌ Erro de conexão com o banco de dados:", err));

// 🔁 Sincronização e arranque do servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor a correr em http://localhost:3000");
  });
});
