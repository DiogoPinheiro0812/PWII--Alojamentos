// middleware/auth.js
module.exports.verificarPermissao = (req, res, next) => {
  const perfil = req.headers["perfil"];
  if (perfil === "admin" || perfil === "facilitador") {
    next();
  } else {
    res.status(403).json({ mensagem: "Acesso negado." });
  }
};
