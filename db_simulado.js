const fs = require('fs/promises');
const caminhoDB = './db.json';

// Estrutura padrão do banco
const estruturaInicial = {
 usuarios: [
 {
 id: 1,
 email: "nutri@nutriviva.com",
 senha: "1234",
 nome: "Nutricionista"
 }
],
pacientes: [],
 agendamentos: [],
 planos: []
};

module.exports = {
 data: {},

 // Carregar banco
 async read() {
 try {
 const conteudo = await fs.readFile(caminhoDB, 'utf8');
 this.data = JSON.parse(conteudo);
 // Se não existir alguma tabela, adiciona
 this.data.usuarios = this.data.usuarios || estruturaInicial.usuarios;
 this.data.pacientes = this.data.pacientes || [];
 this.data.agendamentos = this.data.agendamentos || [];
 this.data.planos = this.data.planos || [];

} catch (err) {
 console.log("Criando db.json novo...");

 this.data = estruturaInicial;
 await this.write(); }
 },

// Salvar no banco
async write() {
 await fs.writeFile(
     caminhoDB,
 JSON.stringify(this.data, null, 2),
 'utf8'
 );
 }
};