const express = require("express");
const router = express.Router();
const db = require("../db_simulado");

// Criar Plano
router.post("/", async (req, res) => {
const { pacienteId, descricao, calorias, dataInicio } = req.body;

await db.read();
    
    // Verifica se o pacienteId existe (Regra de Negócio)
    const paciente = db.data.pacientes.find(p => p.id == pacienteId);
    if (!paciente) {
        return res.status(404).json({
            error: `Erro: Paciente com ID ${pacienteId} não encontrado.`
        });
    }

const novo = {
 id: Date.now(),
pacienteId: parseInt(pacienteId),
 descricao,
 calorias: parseInt(calorias),
dataInicio,
 status: "Ativo",
 dataCriacao: new Date().toISOString()
 };

 db.data.planos.push(novo);
 await db.write();
 res.status(201).json({
     message: "Plano criado!",
plano: novo
 });
});

// Listar Planos
router.get("/", async (req, res) => {
 await db.read();
 res.json(db.data.planos);
});

module.exports = router;