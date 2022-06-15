import express from "express";

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

const app = express();

app.get("/holidays", (req, res) => {
    res.send(holidays);
})

function verificaSeFeriadoHoje() {
    const hoje = new Date();
    for (let i = 0; i < holidays.length; i++) {
        if (holidays[i].date === hoje) {
            return holidays[i].name;
        }
    }
    return '';
}

let feriado = verificaSeFeriadoHoje();

app.get("/is-today-holiday", (req, res) => {
    if (feriado.length !== 0) {
        res.send(`Sim, hoje é ${feriado}`);
    } else {
        res.send("Não, hoje não é feriado");
    }
})

app.get("/holidays/:idDoMes", (req, res) => {
    const id = req.params.idDoMes;
    const feriadosDoMes = holidays.filter(feriado => {
        const array = feriado.date.split("/");
        const mes = array[0];
        if (mes === id) {
            return feriado;
        }
    });

    res.send(feriadosDoMes);
})

app.listen(4001);

