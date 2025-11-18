const express = require("express");
const path = require("path");
const db = require("./db_simulado");

// Rotas
const pacientesRouter = require("./routes/pacientes");
const agendamentosRouter = require("./routes/agendamentos");
const planosRouter = require("./routes/planos");

const app = express();

// Permitir JSON e forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
const viewsPath = path.join(publicPath, "views");

// Arquivos estáticos
app.use(express.static(publicPath));

app.get("/", (req, res) => {
res.sendFile(path.join(viewsPath, "login.html"));
});

app.get("/cadastro-paciente", (req, res) => {
res.sendFile(path.join(viewsPath, "cadastro_paciente.html"));
});

app.get("/agendamentos", (req, res) => {
res.sendFile(path.join(viewsPath, "agendamentos.html"));
});

app.get("/planos", (req, res) => {
res.sendFile(path.join(viewsPath, "planos.html"));
});

app.get("/relatorios", (req, res) => {
res.sendFile(path.join(viewsPath, "relatorios.html"));
});

//Login
app.post("/login", async (req, res) => {
await db.read();
const { email, senha } = req.body;

const usuario = db.data.usuarios.find(
(u) => u.email === email && u.senha === senha );

if (!usuario) {
// Em vez de 401, redirecionamos com um parâmetro de erro para o front mostrar
 return res.redirect("/?error=true");
}

// Redireciona após login bem-sucedido
res.redirect("/cadastro-paciente");
});

// Api
app.use("/api/pacientes", pacientesRouter);
app.use("/api/agendamentos", agendamentosRouter);
app.use("/api/planos", planosRouter);

// Server
app.listen(3000, () => {
console.log("Servidor no ar: http://localhost:3000");
});