const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
require('dotenv').config()
const { PORT } = process.env
const { BARR } = process.env

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

app.get('/lembretes', (req, res) =>{
    res.status(200).send(baseLogs);
});



app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body);

    } catch (err) {}
    res.status(200).send(baseLogs);
});

app.listen(PORT, (() => {
    console.log(`Logs, porta ${PORT}`);
}));