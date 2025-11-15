const express = require('express');
const router = express.Router(); 
const db = require('../db_simulado'); 

router.post('/', async (req, res) => {
const { nome, cpf, dataNascimento, altura, peso, historicoAlimentar } = req.body;

await db.read();

// Regra de Negócio: CPF deve ser único (RNF01)
const pacienteExistente = db.data.pacientes.find(p => p.cpf === cpf);
if (pacienteExistente) {
return res.status(400).json({ 
error: `Erro (RNF01): Paciente com o CPF ${cpf} já cadastrado.` 
});
}
 
 // Cria um ID único e o objeto Paciente
 const novoPaciente = {
id: Date.now(),
nome,
cpf,
 dataNascimento,
 altura: parseFloat(altura), 
peso: parseFloat(peso),
historicoAlimentar,
dataCadastro: new Date().toISOString(),
status: 'Ativo' // Padrão
};
 
 // Adiciona o novo paciente
 db.data.pacientes.push(novoPaciente);
 
 await db.write(); 

 res.status(201).json({ 
 message: 'Paciente cadastrado com sucesso!', 
 pacienteId: novoPaciente.id 
 });
});

// Rota de listar pacientes
router.get('/', async (req, res) => {
 await db.read();
res.status(200).json(db.data.pacientes || []);
});

module.exports = router;