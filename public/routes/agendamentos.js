const express = require("express");
const router = express.Router();
const db = require("../db_simulado");

// Criar Agendamento
router.post("/", async (req, res) => {
const { pacienteId, data, hora, tipo, observacoes } = req.body;

await db.read();

    const paciente = db.data.pacientes.find(p => p.id == pacienteId);
    if (!paciente) {
        return res.status(404).json({
            error: `Erro: Paciente com ID ${pacienteId} não encontrado.`
        });
    }

const agora = new Date();
const dataHora = new Date(`${data}T${hora}:00`);

if (dataHora <= agora) {
return res.status(400).json({
error: "Erro: Não é possível agendar no passado."
 });
}

 const novo = {
 id: Date.now(),
 pacienteId: parseInt(pacienteId),
 data,
hora,
tipo,
observacoes,
status: "Agendado"
};

db.data.agendamentos.push(novo);
await db.write();

res.status(201).json({
message: "Agendamento criado!",
 agendamento: novo
 });
});

// Listar Agendamentos
router.get("/", async (req, res) => {
await db.read();
res.json(db.data.agendamentos);
});

module.exports = router;