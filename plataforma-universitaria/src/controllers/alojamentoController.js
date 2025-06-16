const { Alojamento } = require("../models");

// Criar um novo alojamento
exports.criarAlojamento = async (req, res) => {
  try {
    console.log("Dados recebidos no req.body:", req.body); // ← VERIFICAÇÃO

    const { titulo, facilitadorId } = req.body;

    // Verificação explícita
    if (!titulo || !facilitadorId) {
      return res.status(400).json({ mensagem: "Campos obrigatórios em falta: titulo ou facilitadorId." });
    }

    const novoAlojamento = await Alojamento.create(req.body);
    res.status(201).json(novoAlojamento);
  } catch (error) {
    console.error("Erro ao criar alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao criar alojamento", erro: error.message });
  }
};



// Listar todos os alojamentos
exports.listarAlojamentos = async (req, res) => {
  try {
    const alojamentos = await Alojamento.findAll();
    res.status(200).json(alojamentos);
  } catch (error) {
    console.error("Erro ao listar alojamentos:", error);
    res.status(500).json({ mensagem: "Erro ao listar alojamentos" });
  }
};

// Obter um alojamento pelo ID
exports.obterAlojamentoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const alojamento = await Alojamento.findByPk(id);
    if (!alojamento) {
      return res.status(404).json({ mensagem: "Alojamento não encontrado" });
    }
    res.status(200).json(alojamento);
  } catch (error) {
    console.error("Erro ao obter alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao obter alojamento" });
  }
};

// Atualizar dados de um alojamento
exports.atualizarAlojamento = async (req, res) => {
  try {
    const { id } = req.params;
    const alojamento = await Alojamento.findByPk(id);
    if (!alojamento) {
      return res.status(404).json({ mensagem: "Alojamento não encontrado" });
    }

    await alojamento.update(req.body);
    res.status(200).json({ mensagem: "Alojamento atualizado com sucesso", alojamento });
  } catch (error) {
    console.error("Erro ao atualizar alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar alojamento" });
  }
};

// Remover um alojamento
exports.removerAlojamento = async (req, res) => {
  try {
    const { id } = req.params;
    const alojamento = await Alojamento.findByPk(id);
    if (!alojamento) {
      return res.status(404).json({ mensagem: "Alojamento não encontrado" });
    }

    await alojamento.destroy();
    res.status(200).json({ mensagem: "Alojamento removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover alojamento:", error);
    res.status(500).json({ mensagem: "Erro ao remover alojamento" });
  }
};
