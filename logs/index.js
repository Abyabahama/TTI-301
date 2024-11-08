const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const baseLogs = [];

const funcoes = {
    LembreteCriado: (evento) => {
        const d = new Date()
        const hora = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
        baseLogs[baseLogs.length] = [baseLogs.length, evento.tipo, hora]
        console.log(baseLogs)
    },
    ObservacaoCriada: (evento) => {
        const d = new Date()
        const hora = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
        baseLogs[baseLogs.length] = [baseLogs.length, evento.tipo, hora]
        console.log(baseLogs)
    },
    ObservacaoAtualizada: (evento) => {
        const d = new Date()
        const hora = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
        baseLogs[baseLogs.length] = [baseLogs.length, evento.tipo, hora]
        console.log(baseLogs)
    }
    
}


















app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body);

    } catch (err) {}
    res.status(200).send(baseLogs);
});

app.listen(8000, (() => {
    console.log('Logs, porta 8000');
}));