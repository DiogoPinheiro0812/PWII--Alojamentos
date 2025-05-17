const express = require("express");
const app = express();
const alojamentoRoutes = require("./routes/alojamentoRoutes");
const { sequelize } = require("./models");
const reservaRoutes = require("./routes/reservaRoutes");
const routerParticipacao = require("./routes/participacaoRoutes");
const notificacaoRoutes = require("./routes/notificacaoRoutes");





app.use(express.json());
app.use("/notificacoes", notificacaoRoutes);
app.use("/api", routerParticipacao);
app.use("/api/alojamentos", alojamentoRoutes);
app.use("/api/reservas", reservaRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor a correr em http://localhost:3000");
  });
});
