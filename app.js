// app.js - controla cadastros, os planos e agendamentos de pacientes

document.addEventListener("DOMContentLoaded", () => {

    // cadastrar paciente

    const formPaciente = document.querySelector("#formPaciente");

    if (formPaciente) {
        formPaciente.addEventListener("submit", async (e) => {
            e.preventDefault();

            const dados = {
                nome: document.getElementById("nome").value,
                cpf: document.getElementById("cpf").value,
                dataNascimento: document.getElementById("dataNascimento")?.value || "",
                altura: document.getElementById("altura")?.value || "",
                peso: document.getElementById("peso")?.value || "",
                historicoAlimentar: document.getElementById("historico").value
            };

            const resp = await fetch("/api/pacientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            const resultado = await resp.json();

            if (resp.ok) {
                alert("Paciente cadastrado!");
                formPaciente.reset();
            } else {
                alert(resultado.error);
            }
        });
    }

    const formPlano = document.querySelector("#formCadastroPlano");

    if (formPlano) {
        formPlano.addEventListener("submit", async (e) => {
            e.preventDefault();

            const dados = {
                pacienteId: document.getElementById("pacienteId").value,
                descricao: document.getElementById("descricao").value,
                calorias: document.getElementById("calorias").value,
                dataInicio: document.getElementById("dataInicio").value
            };

            const resp = await fetch("/api/planos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            const resultado = await resp.json();

            if (resp.ok) {
                alert("Plano alimentar salvo!");
                formPlano.reset();
            } else {
                alert(resultado.error);
            }
        });
    }

});
